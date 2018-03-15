import React from 'react';
import ReduxUtils from '../utils/redux_utils';

class EditorButton extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick () {
    let {type} = this.props;
    this.props.actions.setEditor(type);
  };

  render () {
    return (
      <div onClick={this.onClick}>
        {this.props.text}
      </div>
    );
  };
};

export default ReduxUtils.connect(null, true)(EditorButton);
