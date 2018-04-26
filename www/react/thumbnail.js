import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import RequestUtils from '../utils/request_utils';
import base64 from 'base-64';

class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  delay (ms) {
    return new Promise(_ => setTimeout(_, ms || 5000));
  };

  getThumbnail () {
    let qs = {fileId: this.props.modelName};
    return RequestUtils.getRequest('/thumbnail', qs);
  };

  getThumbnailLoop () {
    return this.getThumbnail().then(data => {
      if (data.found) {
        return Promise.resolve(data);
      }
      return this.delay().then(_ => this.getThumbnailLoop());
    });
  };

  updateThumbnail () {
    this.props.actions.resetModelThumbnail();
    this.getThumbnailLoop().then(({thumbnail}) => {
      this.props.actions.setModelThumbnail(thumbnail);
    });
  };

  onClick () {
    let walls  = this.props.documentElements
                    .filter(elem => elem.type === 'wall')
                    .map(elem => elem.export());
    let floors = this.props.documentElements
                    .filter(elem => elem.type === 'floor')
                    .map(elem => elem.export());
    let elements = {walls, floors};

    RequestUtils.postRequest('/create', {elements})
                .then(({fileId}) => {
                  this.props.actions.setModelName(fileId);
                  this.updateThumbnail();
                });
  };

  render () {
    return (
      <div id='thumbnail'>
        <div className='tn-button' onClick={this.onClick}>
          <span className='tn-button-span'>
            Upload to Design Automation for Revit
          </span>
        </div>
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    documentElements: state.documentElements,
    modelName: state.modelName,
    modelThumbnail: state.modelThumbnail
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Thumbnail);
