import React from 'react';
import Element from './element';
import ArrayUtils from '../utils/array_utils';

class Floor extends Element {
  constructor (curves) {
    super();
    this.type = 'floor';
    this.curves = curves;
  };

  render (temp) {
    let {curves} = this;
    return (
      <g> {
        ArrayUtils.range(curves.length).map(idx => (
          <g key={'curve_'+idx}>
            {curves[idx].render(temp)}
          </g>
        ))
      } </g>
    );
  };
};

export default Floor;
