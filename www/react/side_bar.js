import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import EditorButton from './editor_button';
import Thumbnail from './thumbnail';
import Editor from './editor';
import ElementUtils from '../utils/element_utils';


class SideBar extends React.Component {

  getEditorData () {
    return [
      { type: 'wall',       generateElems: ElementUtils.generateWallsFromPoints  },
      { type: 'floor',      generateElems: ElementUtils.generateFloorsFromPoints },
      { type: 'door',       generateElems: null },
      { type: 'window',     generateElems: null },
      { type: 'ceiling',    generateElems: null },
      { type: 'roof',       generateElems: null },
      { type: 'component',  generateElems: null },
      { type: 'column',     generateElems: null }
    ];
  };

  getActiveEditorComponent () {
    let editorData = this.getEditorData().filter(data => data.type === this.props.editorElem);

    if (editorData.length<1) return null;
    if (!editorData[0].generateElems) return null;

    return (<Editor key={'editor_class'+editorData[0].type} generateElems={editorData[0].generateElems}/>);
  };

  render () {
    return (
      <div id='side-bar'>
        <div id='editors'>
          { this.getEditorData().map(data => (<EditorButton key={'editor_button'+data.type} className='other' type={data.type}/>)) }
        </div>
        { this.getActiveEditorComponent() }
        <Thumbnail />
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    editorElem: state.editorElem,
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(SideBar);
