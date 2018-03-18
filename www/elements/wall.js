import React from 'react';
import Element from './element';
import Curve from './curve';

class Wall extends Element {
  constructor (start, end) {
    super();
    this.type = 'wall';
    this.curve = new Curve(start, end);
  };

  render (temp, idx) {
    let {start, end} = this.curve;
    let color = temp ? 'blue' : 'red';
    return (<line key={this.getKey(temp, idx)} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth='2' vectorEffect='non-scaling-stroke' />);
  };
};

export default Wall;
