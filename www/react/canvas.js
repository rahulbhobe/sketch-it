import React from 'react';
import CanvasEvents from './canvas_events';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.getSvg = this.getSvg.bind(this);
  };

  getSvg () {
    return this.refs.svg;
  };

  render () {
    return (<div id="canvas">
              <svg id="svg" ref='svg' />
              <CanvasEvents getSvg={this.getSvg} />
            </div>);
  };
};

export default Canvas;
