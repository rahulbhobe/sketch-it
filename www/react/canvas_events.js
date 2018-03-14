import React from 'react';
import debounce from 'debounce';
import {Vector, Matrix} from '../mathutils/gl_matrix_wrapper';
import ReduxUtils from '../utils/redux_utils';
import store from '../store/store';

class CanvasEvents extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onMouseWheelDoc = this.onMouseWheelDoc.bind(this);
    this.onResize = this.onResize.bind(this);
    this.resetEventDataDebounce = debounce(this.resetEventDataDebounce.bind(this), 200);
    this.onMouseDownDebounce = debounce(this.onMouseDownDebounce.bind(this), 200);
  };

  getSvgRect () {
    return this.props.getSvg().getBoundingClientRect();
  };

  getPositionAtEvent (event) {
    let boundingRect   = this.getSvgRect();
    return {
      x: event.clientX - boundingRect.left,
      y: event.clientY - boundingRect.top
    };
  };

  componentDidMount () {
    let svg = this.props.getSvg();
    svg.addEventListener('mousemove', this.onMouseMove, false);
    svg.addEventListener('mouseup', this.onMouseUp, false);
    svg.addEventListener('mousedown', this.onMouseDown, false);
    svg.addEventListener('mouseleave', this.onMouseLeave, false);
    svg.addEventListener('mousewheel', this.onMouseWheel, false);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('keydown', this.onKeydown, false);
    document.addEventListener('mousewheel', this.onMouseWheelDoc, false);
    svg.oncontextmenu = this.onContextMenu;
  };

  componentWillUnmount () {
    let svg = this.props.getSvg();
    svg.removeEventListener('mousemove', this.onMouseMove, false);
    svg.removeEventListener('mouseup', this.onMouseUp, false);
    svg.removeEventListener('mousedown', this.onMouseDown, false);
    svg.removeEventListener('mouseleave', this.onMouseLeave, false);
    svg.removeEventListener('mousewheel', this.onMouseWheel, false);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('keydown', this.onKeydown, false);
    document.removeEventListener('mousewheel', this.onMouseWheelDoc, false);
    svg.oncontextmenu = null;
  };

  onContextMenu (event) {
    event.preventDefault();
    return false;
  };

  onMouseWheelDoc (event) {
    event.preventDefault();
    return false;
  };

  onMouseDownDebounce (event) {
    let dataType = 'none';
    let data     = {};

    if (!event.shiftKey) {
      dataType = 'pan';
      data.origin = this.props.origin;
    } else {
      dataType = 'rotate';
      data.upVector = this.props.upVector;
    }

    this.props.actions.setEventData(dataType, this.getPositionAtEvent(event), data);
  };

  onMouseDown (event) {
    this.onMouseDownDebounce(event);
  };

  onMouseMove (event) {
    let data = store.getState().eventData;
    if (data.type === 'pan') {
      this.handlePan(event);
    } else if (data.type === 'rotate') {
      this.handleRotate(event);
    }
  };

  onMouseUp (event) {
    this.onMouseDownDebounce.clear();

    let data     = store.getState().eventData;
    if (data.type === 'pan') {
      this.handlePan(event);
    } else if (data.type === 'rotate') {
      this.handleRotate(event);
    } else {
      this.handleEditorClick(event);
      return;
    }

    this.props.actions.resetEventData();
  };

  onMouseLeave () {
    this.onMouseDownDebounce.clear();
    this.props.actions.resetEventData();
  };

  onMouseWheel (event) {
    event.preventDefault();

    let dataType  = 'none';
    let data      = {};
    let wheelDistance = Math.round(event.wheelDeltaY/30);
    let zoomFactor    = this.props.zoomFactor + wheelDistance;
    if (zoomFactor < 25) {
      zoomFactor = 25;
    } else if (zoomFactor > 200) {
      zoomFactor = 200;
    }

    if (wheelDistance > 0) {
      dataType = 'zoomin';
      data.zoomFactor = this.props.zoomFactor;
    } else if (wheelDistance < 0) {
      dataType = 'zoomout';
      data.zoomFactor = this.props.zoomFactor;
    }

    if (zoomFactor !== this.props.zoomFactor) {
      this.props.actions.setEventData(dataType, this.getPositionAtEvent(event), data);
      this.props.actions.setZoomFactor(zoomFactor);
    }
    this.resetEventDataDebounce();
    return false;
  };

  resetEventDataDebounce () {
    this.props.actions.resetEventData();
  };

  setCanvasDimensions () {
    let {width, height}  = this.getSvgRect();
    this.props.actions.setCanvasDimensions(width, height);
  }

  onResize (e) {
    this.resetEventDataDebounce();
    this.setCanvasDimensions();
  };

  onKeydown (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
    if (event.keyCode !== 27) {
      return;
    }

    let data     = store.getState().eventData;
    if (data.type === 'pan') {
      this.cancelPan();
    } else if (data.type === 'rotate') {
      this.cancelRotate();
    }
    this.props.actions.resetEventData();
    this.props.actions.resetEditorData();
  };

  createVectorFromObj (vecObj) {
    return Vector.create(vecObj.x, vecObj.y);
  };

  createVectorInModelCoordinates (vecObj) {
    let screenToModel = this.props.getScreenToModel();
    return screenToModel.transformPoint(this.createVectorFromObj(vecObj));
  };

  handleRotate (event) {
    let data            = store.getState().eventData;
    let midPoint        = this.createVectorInModelCoordinates({x: this.getSvgRect().width*0.5, y: this.getSvgRect().height*0.5});
    let startVec        = this.createVectorInModelCoordinates(data.startData.position).subtract(midPoint);
    let currentVec      = this.createVectorInModelCoordinates(this.getPositionAtEvent(event)).subtract(midPoint);

    let matrix          = Matrix.create().rotate(-1 * startVec.angleTo(currentVec));
    let upVector        = matrix.transformPoint(this.createVectorFromObj(data.startData.upVector));
    this.props.actions.setUpVector(upVector.asObj());
  };

  cancelRotate () {
    let data = store.getState().eventData;
    this.props.actions.setUpVector(data.startData.upVector);
  };

  handlePan (event) {
    let data            = store.getState().eventData;
    let startPnt        = this.createVectorInModelCoordinates(data.startData.position);
    let currentPnt      = this.createVectorInModelCoordinates(this.getPositionAtEvent(event));
    let moveVec         = currentPnt.subtract(startPnt);

    let org = this.createVectorFromObj(data.startData.origin).subtract(moveVec);
    this.props.actions.setOrigin(org.asObj());
  };

  handleEditorClick (event) {
    let data     = {};
    data.location = this.createVectorInModelCoordinates(this.getPositionAtEvent(event)).asObj();
    this.props.actions.addEditorData(data);
  };

  cancelPan () {
    let data = store.getState().eventData;
    this.props.actions.setOrigin(data.startData.origin);
  };

  render() {
    return null;
  }
};

let mapStateToProps = (state, ownProps) => {
  return {
    zoomFactor: state.zoomFactor,
    upVector: state.upVector,
    origin: state.origin
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(CanvasEvents);
