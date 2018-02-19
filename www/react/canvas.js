import React from 'react';
import {Vector, MatrixTransformations, Matrix} from '../mathutils/gl_matrix_wrapper';
import ReduxUtils from '../utils/redux_utils';
import AngleConverter from '../mathutils/angle_converter';
import CanvasEvents from './canvas_events';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.getSvg = this.getSvg.bind(this);
  };

  getSvg () {
    return this.refs.svg;
  };

  getModelTransformations () {
    let matrixTransforms = MatrixTransformations.create();

    let negOrg = Vector.create(this.props.origin.x, this.props.origin.y).negate();
    matrixTransforms.append(m => m.translate(negOrg));
    matrixTransforms.append(m => m.scale(this.props.zoomFactor*0.01));
    matrixTransforms.append(m => m.rotate(AngleConverter.toRad(-1 * this.props.rotationAngle)));

    let midRect = Vector.create(this.props.dimensions.width, this.props.dimensions.height).scale(0.5);
    matrixTransforms.append(m => m.translate(midRect));

    return matrixTransforms;
  };

  getTransformAsString () {
    let matrixTransforms = this.getModelTransformations();
    let matrix = matrixTransforms.transformMatrix(Matrix.create());
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
    return (<div id="canvas">
              <svg id="svg" ref='svg'>
                <g transform={this.getTransformAsString()} >
                  <line x1="0" y1="0" x2="200" y2="200" stroke="red" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="red" />
                </g>
              </svg>
              <CanvasEvents getSvg={this.getSvg} />
            </div>);
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    zoomFactor: state.zoomFactor,
    rotationAngle: state.rotationAngle,
    origin: state.origin,
    dimensions: state.canvasDimensions
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Canvas);
