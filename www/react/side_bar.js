import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import EditorButton from './editor_button';
import Editor from './editor';
import FloorsEditor from './floors_editor';
import ElementUtils from '../utils/element_utils';


class SideBar extends React.Component {
  getEditorComponent () {
    if (this.props.editor === 'walls')
      return (<Editor key='walls_editor' generateElems={ElementUtils.generateWallsFromPoints}/>);
    if (this.props.editor === 'floors')
      return (<Editor key='floors_editor' generateElems={ElementUtils.generateFloorsFromPoints}/>);
    return null;
  };

  render () {
    let editor = this.getEditorComponent();
    return (
      <div id='side-bar'>
        <EditorButton type='walls'  />
        <EditorButton type='floors' />
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
