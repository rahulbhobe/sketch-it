import React from 'react';
import Element from './element';

class Wall extends Element {
  constructor (curve) {
    super();
    this.type = 'wall';
    this.curve = curve;
  };

  render (temp) {
    return (
      <g>
        {this.curve.render(temp)}
      </g>
    );
  };
};

export default Wall;
