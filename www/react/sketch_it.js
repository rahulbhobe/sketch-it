import React from 'react';
import Canvas from './canvas';

let HeaderView = () => (
  <div id="header">
    Sketch It
  </div>
);

let FooterView = () => (
  <div id="footer">
    &copy; Copyright 2018 Autodesk, Inc.
  </div>
);

let SideView = () => (
  <div id="side-view" />
);

let SketchIt = () => (
  <div id="container">
    <HeaderView />
    <Canvas />
    <SideView />
    <FooterView />
  </div>
);

export default SketchIt;
