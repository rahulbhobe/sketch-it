import React from 'react';

class Curve {
  constructor (start, end) {
    this.start = start;
    this.end = end;
  };

  render (temp) {
    let {start, end} = this;
    let color = temp ? 'blue' : 'red';
    return (<line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth='2' vectorEffect='non-scaling-stroke' />);
  };
};

export default Curve;
