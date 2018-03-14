import React from 'react';
import ReduxUtils from '../utils/redux_utils';

class EditorButton extends React.Component {
  constructor (props) {
    super(props);
    this.startEditor = this.startEditor.bind(this);
  };

  startEditor () {
    let EditorClass = this.props.editor;
    this.props.actions.setEditor(new EditorClass());
  };

  render () {
    return (
      <div onClick={this.startEditor}>
        {this.props.text}
      </div>
    );
  };
};

export default ReduxUtils.connect(null, true)(EditorButton);
