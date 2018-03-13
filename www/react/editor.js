import React from 'react';
import ReduxUtils from '../utils/redux_utils';

class Editor extends React.Component {
  render () {
    return (
      <div>
        {this.props.eventData.type}
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    eventData: state.eventData
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Editor);
