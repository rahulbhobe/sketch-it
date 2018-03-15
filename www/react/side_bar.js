import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import EditorButton from './editor_button';
import WallsEditor from './walls_editor';
import FloorsEditor from './floors_editor';


class SideBar extends React.Component {
  getEditorComponent () {
    if (this.props.editor === 'walls')
      return (<WallsEditor />);
    if (this.props.editor === 'floors')
      return (<FloorsEditor />);
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
