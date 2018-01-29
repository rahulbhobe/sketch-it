import React from 'react';

let HeaderView = () => {
  return (<div id="header">
            Sketch It
          </div>);
};

let FooterView = () => {
  return (<div id="footer">
            &copy; Copyright 2018 Autodesk, Inc.
          </div>);
};

let Canvas = () => {
  return (<div id="canvas">
            <svg id="svg"/>
          </div>);
};

let SideView = () => {
  return (<div id="side-view">
          </div>);
};

class SketchIt extends React.Component {
  render () {
    return (<div id="container">
              <HeaderView />
              <Canvas />
              <SideView />
              <FooterView />
            </div>);
  };
};

export default SketchIt;
