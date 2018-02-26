import React from 'react';
import Canvas from './canvas';
import SideBar from './side_bar';

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

let SketchIt = () => (
  <div id="container">
    <HeaderView />
    <Canvas />
    <SideBar />
    <FooterView />
  </div>
);

export default SketchIt;
