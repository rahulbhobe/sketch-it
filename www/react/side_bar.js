import React from 'react';

let Button = (props) => (
  <div>
    {props.text}
  </div>
);

let SideBar = () => (
  <div id="side-bar">
    <Button text="Wall" />
    <Button text="Floor" />
  </div>
);

export default SideBar;
