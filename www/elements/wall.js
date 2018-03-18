import React from 'react';
import Element from './element';

class Wall extends Element {
  constructor (start, end) {
    super();
    this.start = start;
    this.end = end;
    this.type = 'wall';
  };

  render (temp, idx) {
    let {start, end} = this;
    let color = temp ? 'blue' : 'red';
    return (<line key={this.getKey(temp, idx)} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth='2' vectorEffect='non-scaling-stroke' />);
  };
};

export default Wall;
