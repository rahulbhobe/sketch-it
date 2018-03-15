import React from 'react';
import EditorButton from './editor_button'

let SideBar = () => (
  <div id='side-bar'>
    <EditorButton text='Wall'  type='walls'  />
    <EditorButton text='Floor' type='floors' />
  </div>
);

export default SideBar;
