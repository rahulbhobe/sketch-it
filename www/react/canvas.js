import React from 'react';
import {Vector, MatrixTransformations} from '../mathutils/gl_matrix_wrapper';
import ReduxUtils from '../utils/redux_utils';
import CanvasEvents from './canvas_events';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.getSvg = this.getSvg.bind(this);
    this.getScreenToModel = this.getScreenToModel.bind(this);
  };

  getSvg () {
    return this.refs.svg;
  };

  getScreenToModel () {
    return this.getModelToScreen().invert();
  };

  getModelToScreen () {
    let matrixTransforms = MatrixTransformations.create();

    let negOrg = Vector.create(this.props.origin.x, this.props.origin.y).negate();
    matrixTransforms.append(m => m.translate(negOrg));
    matrixTransforms.append(m => m.scale(this.props.zoomFactor*0.01));

    let upVec  = Vector.create(this.props.upVector.x, this.props.upVector.y);
    matrixTransforms.append(m => m.rotate(upVec.angleTo(Vector.create(0, 1))));

    matrixTransforms.append(m => m.scale(1, -1));
    let midRect = Vector.create(this.props.dimensions.width, this.props.dimensions.height).scale(0.5);
    matrixTransforms.append(m => m.translate(midRect));

    return matrixTransforms.getMatrix();
  };

  getModelToScreenAsString () {
    let matrix = this.getModelToScreen();
    return 'matrix( ' + matrix.asArr().join(',') + ')';
  };

  setCanvasDimensions () {
    let {width, height}  = this.getSvg().getBoundingClientRect();
    this.props.actions.setCanvasDimensions(width, height);
  }

  componentDidMount () {
    this.setCanvasDimensions();
  }

  render () {
    return (
      <div id="canvas">
        <svg id="svg" ref='svg'>
          <g transform={this.getModelToScreenAsString()} >
            <line x1="0" y1="0" x2="200" y2="200" stroke="red" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="red" />
          </g>
        </svg>
        <CanvasEvents getSvg={this.getSvg} getScreenToModel={this.getScreenToModel} />
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    zoomFactor: state.zoomFactor,
    upVector: state.upVector,
    origin: state.origin,
    dimensions: state.canvasDimensions
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Canvas);
