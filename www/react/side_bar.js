import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import EditorButton from './editor_button';
import Editor from './editor';
import FloorsEditor from './floors_editor';
import ElementUtils from '../utils/element_utils';


class SideBar extends React.Component {
  getEditorComponent () {
    if (this.props.editor === 'walls')
      return (<Editor generateElems={ElementUtils.generateWallsFromPoints}/>);
    if (this.props.editor === 'floors')
      return (<Editor generateElems={ElementUtils.generateFloorsFromPoints}/>);
    return null;
  };

  render () {
    let editor = this.getEditorComponent();
    return (
      <div id='side-bar'>
        <EditorButton text='Wall'  type='walls'  />
        <EditorButton text='Floor' type='floors' />
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
