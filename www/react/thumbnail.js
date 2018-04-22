import React from 'react';
import RequestUtils from '../utils/request_utils';

class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick () {
    RequestUtils.postRequest('/create', {data: null})
                .then(({fileId}) => console.log(fileId));
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

export default Thumbnail;
