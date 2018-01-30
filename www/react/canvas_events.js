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

    componentDidMount () {
      let svg = this.refs.wrapped.refs.svg;
      svg.addEventListener('mousemove', this.onMouseMove, false);
      svg.addEventListener('mouseup', this.onMouseUp, false);
      svg.addEventListener('mousedown', this.onMouseDown, false);
      svg.addEventListener('mouseleave', this.onMouseLeave, false);
    };

    componentWillUnmount () {
      let svg = this.refs.wrapped.refs.svg;
      svg.removeEventListener('mousemove', this.onMouseMove, false);
      svg.removeEventListener('mouseup', this.onMouseUp, false);
      svg.removeEventListener('mousedown', this.onMouseDown, false);
      svg.removeEventListener('mouseleave', this.onMouseLeave, false);
    };

    onMouseMove () {
      console.log('mouse moved');
    };

    onMouseUp () {
      console.log('mouse up');
    };

    onMouseDown () {
      console.log('mouse down');
    };

    onMouseLeave () {
      console.log('mouse leave');
    };

    render() {
      return <WrappedComponent ref='wrapped'/>;
    }
  };
};

export default CanvasEvents;
