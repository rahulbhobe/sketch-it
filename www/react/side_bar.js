import React from 'react';
import Editor from './editor';

let Button = (props) => (
  <div>
    {props.text}
    <Editor text={props.text}/>
  </div>
);

let SideBar = () => (
  <div id="side-bar">
    <Button text="Wall" />
    <Button text="Floor" />
  </div>
);

export default SideBar;
