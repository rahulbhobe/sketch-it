import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import ArrayUtils from '../utils/array_utils';

class Editor extends React.Component {
  componentDidMount () {
    this.editorReset();
  };

  componentDidUpdate () {
    if (this.handleEvent()) return;
    this.props.actions.setTemporaryElements(this.generateElements(true));
  };

  componentWillUnmount () {
    this.editorReset();
  };

  editorReset () {
    this.props.actions.resetEditorPoints();
    this.props.actions.resetEditorEvent();
  };

  handleEvent () {
    let {event} = this.props;
    if (!event) return false;

    if (event.type === 'done') {
      this.props.actions.addDocumentElements(this.generateElements(false));
      this.editorReset();
      return true;
    }

    if (event.type === 'click') {
      this.props.actions.resetEditorEvent();
      this.props.actions.addEditorPoints([event.point]);
      return true;
    }

    return false;
  };

  getPoints (temp) {
    let points = this.props.points.slice();
    if (!temp) return points;

    let {event} = this.props;
    if (!event) return points;
    if (event.type !== 'move') return points;
    return points.concat([event.point]);
  };

  generateElements (temp) {
    let points = this.getPoints(temp);
    return this.props.generateElems(points, temp);
  };

  render () {
    return null;
  };
};


let mapStateToProps = (state, ownProps) => {
  return {
    points: state.editorPoints,
    length: state.editorPoints.length,
    event: state.editorEvent
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Editor);
