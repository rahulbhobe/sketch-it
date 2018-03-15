import React from 'react';
import ReduxUtils from '../utils/redux_utils';

class FloorsEditor extends React.Component {
  render () {
    return (
      <div>
        {this.props.lengthPoints}
      </div>
    );
  };
};


let mapStateToProps = (state, ownProps) => {
  return {
    editorPoints: state.editorPoints,
    lengthPoints: state.editorPoints.length
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(FloorsEditor);
