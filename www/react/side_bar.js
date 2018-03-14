import React from 'react';
import EditorButton from './editor_button'
import WallsEditor from '../editor/walls_editor';
import FloorsEditor from '../editor/floors_editor';

let SideBar = () => (
  <div id="side-bar">
    <EditorButton text="Wall"  editor={WallsEditor} />
    <EditorButton text="Floor" editor={FloorsEditor} />
  </div>
);

export default SideBar;
