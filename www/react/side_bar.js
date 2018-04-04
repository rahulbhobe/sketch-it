import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import EditorButton from './editor_button';
import Editor from './editor';
import ElementUtils from '../utils/element_utils';


class SideBar extends React.Component {
  getEditorComponent () {
    if (this.props.editor === 'wall')
      return (<Editor key='wall_editor' generateElems={ElementUtils.generateWallsFromPoints}/>);
    if (this.props.editor === 'floor')
      return (<Editor key='floor_editor' generateElems={ElementUtils.generateFloorsFromPoints}/>);
    return null;
  };

  render () {
    let editor = this.getEditorComponent();
    return (
      <div id='side-bar'>
        <EditorButton type='wall'  />
        <EditorButton type='floor' />
        <EditorButton type='door' />
        <EditorButton type='window' />
        <EditorButton type='ceiling' />
        <EditorButton type='roof' />
        <EditorButton type='component' />
        <EditorButton type='column' />
        {editor}
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(SideBar);
