import React from 'react';

let CanvasEvents = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
    };

    getSvg () {
      return this.refs.wrapped.refs.svg;
    };

    getSvgRect () {
      return this.getSvg().getBoundingClientRect();
    };

    getPositionAtEvent (event) {
      let boundingRect   = this.getSvgRect();
      return {
        x: event.clientX - boundingRect.left,
        y: event.clientY - boundingRect.top
      };
    };

    componentDidMount () {
      let svg = this.getSvg();
      svg.addEventListener('mousemove', this.onMouseMove, false);
      svg.addEventListener('mouseup', this.onMouseUp, false);
      svg.addEventListener('mousedown', this.onMouseDown, false);
      svg.addEventListener('mouseleave', this.onMouseLeave, false);
    };

    componentWillUnmount () {
      let svg = this.getSvg();
      svg.removeEventListener('mousemove', this.onMouseMove, false);
      svg.removeEventListener('mouseup', this.onMouseUp, false);
      svg.removeEventListener('mousedown', this.onMouseDown, false);
      svg.removeEventListener('mouseleave', this.onMouseLeave, false);
    };

    onMouseMove (event) {
      console.log('mouse moved');
    };

    onMouseUp (event) {
      console.log('mouse up', this.getPositionAtEvent(event));
    };

    onMouseDown (event) {
      console.log('mouse down', this.getPositionAtEvent(event));
    };

    onMouseLeave (event) {
      console.log('mouse leave');
    };

    render() {
      return <WrappedComponent ref='wrapped'/>;
    }
  };
};

export default CanvasEvents;
