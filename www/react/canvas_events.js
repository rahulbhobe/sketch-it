import React from 'react';
import debounce from 'debounce';

let CanvasEvents = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onMouseWheel = this.onMouseWheel.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
      this.onContextMenu = this.onContextMenu.bind(this);
      this.onMouseWheelDoc = this.onMouseWheelDoc.bind(this);
      this.onResize = this.onResize.bind(this);
      this.resetEventDataDebounce = debounce(this.resetEventDataDebounce.bind(this), 200);
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
      svg.addEventListener('mousewheel', this.onMouseWheel, false);
      window.addEventListener('resize', this.onResize);
      document.addEventListener('keydown', this.onKeydown, false);
      document.addEventListener('mousewheel', this.onMouseWheelDoc, false);
      svg.oncontextmenu = this.onContextMenu;
    };

    componentWillUnmount () {
      let svg = this.getSvg();
      svg.removeEventListener('mousemove', this.onMouseMove, false);
      svg.removeEventListener('mouseup', this.onMouseUp, false);
      svg.removeEventListener('mousedown', this.onMouseDown, false);
      svg.removeEventListener('mouseleave', this.onMouseLeave, false);
      svg.removeEventListener('mousewheel', this.onMouseWheel, false);
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('keydown', this.onKeydown, false);
      document.removeEventListener('mousewheel', this.onMouseWheelDoc, false);
      svg.oncontextmenu = null;
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

    onMouseWheel (event) {
      console.log('mouse wheel');
    };

    onMouseWheelDoc (event) {
      console.log('mouse wheel doc');
    };

    onContextMenu (event) {
      console.log('context menu');
      event.preventDefault();
      return false;
    };

    onResize (event) {
      console.log('resize');
    };

    onKeydown (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        return false;
      }
      if (event.keyCode !== 27) {
        return;
      }
    };

    resetEventDataDebounce () {
     console.log('reset event data');
    };

    render() {
      return <WrappedComponent ref='wrapped'/>;
    }
  };
};

export default CanvasEvents;
