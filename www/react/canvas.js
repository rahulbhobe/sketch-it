import React from 'react';
import CanvasEvents from './canvas_events';

class Canvas extends React.Component {
  render () {
    return (<div id="canvas">
              <svg id="svg" ref='svg' />
            </div>);
  };
};

export default CanvasEvents(Canvas);
