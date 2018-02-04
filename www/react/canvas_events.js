import React from 'react';
import debounce from 'debounce';
import {Vector, MatrixTransformations} from '../mathutils/gl_matrix_wrapper';
import ReduxUtils from '../utils/redux_utils';
import AngleConverter from '../mathutils/angle_converter';
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

  onMouseDown (event) {
    var {origin, rotationAngle, zoomFactor} = this.props;
    console.log(origin);
    console.log(rotationAngle);
    console.log(zoomFactor);
    let dataType = 'none';
    let data     = {};

    if (!event.shiftKey) {
      dataType = 'pan';
      data.origin = this.props.origin;
    } else {
      dataType = 'rotate';
      data.angle = this.props.rotationAngle;
    }

    this.props.actions.setEventData(dataType, this.getPositionAtEvent(event), data);
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
    let data     = store.getState().eventData;
    if (data.type === 'pan') {
      this.handlePan(event);
    } else if (data.type === 'rotate') {
      this.handleRotate(event);
    }
    this.props.actions.resetEventData();
  };

  onMouseLeave () {
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

  onResize (e) {
    this.props.actions.setEventData('resize', {x: -1, y: -1}, {canvasDimensions: this.props.canvasDimensions});
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
  };

  handleRotate (event) {
    let data            = store.getState().eventData;
    let startAngle      = data.startData.angle;
    let startPosition   = data.startData.position;
    let currentPosition = this.getPositionAtEvent(event);
    let midPoint        = Vector.create(this.getWindowWidth()*0.5, this.getWindowHeight()*0.5);
    let startVec        = Vector.create(startPosition.x, startPosition.y).subtract(midPoint);
    let currentVec      = Vector.create(currentPosition.x, currentPosition.y).subtract(midPoint);
    let angle           = AngleConverter.toDeg(currentVec.angleFrom(startVec));
    this.props.actions.setRotationAngle(startAngle + angle);
  };

  cancelRotate () {
    let data = store.getState().eventData;
    this.props.actions.setRotationAngle(data.startData.angle);
  };

  handlePan (event) {
    let data            = store.getState().eventData;
    let oldOrigin       = data.startData.origin;
    let startPosition   = data.startData.position;
    let currentPosition = this.getPositionAtEvent(event);
    let startPnt        = Vector.create(startPosition.x, startPosition.y);
    let currentPnt      = Vector.create(currentPosition.x, currentPosition.y);

    let matrixTrfs      = MatrixTransformations.create();
    matrixTrfs.append(m => m.rotate(AngleConverter.toRad(this.props.rotationAngle)));
    matrixTrfs.append(m => m.scale(1 / (this.props.zoomFactor*0.01)));

    let moveVec = matrixTrfs.transformPoint(currentPnt.subtract(startPnt));
    let org = Vector.create(oldOrigin.x, oldOrigin.y).subtract(moveVec);
    this.props.actions.setOrigin(org.asObj());
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
    rotationAngle: state.rotationAngle,
    origin: state.origin
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(CanvasEvents);
