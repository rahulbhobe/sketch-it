import React from 'react';

class Curve {
  constructor (start, end) {
    this.start = start;
    this.end = end;
  };

  render (temp) {
    let {start, end} = this;
    let color = 'black';
    let width = temp ? 1 : 2;
    return (<line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth={width} vectorEffect='non-scaling-stroke' />);
  };
};

export default Curve;
