import React from 'react';
import ReduxUtils from '../utils/redux_utils';

class Viewer extends React.Component {
  render () {
    return (
      <div id="viewer">
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    modelName: state.modelName
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Viewer);
