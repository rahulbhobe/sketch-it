import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import RequestUtils from '../utils/request_utils';
import base64 from 'base-64';
import classNames from 'classnames';

class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.onTranslateModel = this.onTranslateModel.bind(this);
    this.onShowModel = this.onShowModel.bind(this);
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
    }).then(_ => {
      let qs = {fileId: this.props.modelName};
      return RequestUtils.getRequest('/download', qs);
    }).then(data => {
      if (!data.found) return;
      this.props.actions.setModelDownloadUrl(data.signedUrl);
    });
  };

  onTranslateModel () {
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

  onShowModel () {
    this.props.actions.setShowViewer(true);
  };

  getComponent () {
    if (!this.props.modelName) {
      return (<div className={classNames('tn-button', 'tn-button-green')} onClick={this.onTranslateModel}>
        <span className='tn-button-span'>
          Upload to Design Automation for Revit
        </span>
      </div>);
    } else if (!this.props.modelThumbnail) {
      return (<div className={classNames('tn-button', 'tn-button-yellow')}>
        <span className='tn-button-span'>
          Waiting for translation
        </span>
      </div>);
    } else if (!this.props.showModel) {
      return (<div className={classNames('tn-button', 'tn-button-image')}>
        <img src={'data:image/png;base64,' + this.props.modelThumbnail} onClick={this.onShowModel}/>
      </div>);
    } else {
      return (<div className={classNames('tn-button', 'tn-button-image')}>
        <a href={this.props.modelDownloadUrl}>
          <img src={'data:image/png;base64,' + this.props.modelThumbnail} />
        </a>
      </div>);
    }

  };

  render () {
    return (
      <div id='thumbnail'>
        {this.getComponent()}
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    documentElements: state.elementsData.permanent,
    modelName: state.modelData.name,
    modelThumbnail: state.modelData.thumbnail,
    modelDownloadUrl: state.modelData.downloadUrl,
    showModel: state.modelData.showViewer
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Thumbnail);
