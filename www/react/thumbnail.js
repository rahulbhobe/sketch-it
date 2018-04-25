import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import RequestUtils from '../utils/request_utils';
import base64 from 'base-64';

class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick () {
    let walls  = this.props.documentElements
                    .filter(elem => elem.type === 'wall')
                    .map(elem => elem.export());
    let floors = this.props.documentElements
                    .filter(elem => elem.type === 'floor')
                    .map(elem => elem.export());
    let data = base64.encode(JSON.stringify({walls, floors}));

    RequestUtils.postRequest('/create', {data})
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

let mapStateToProps = (state, ownProps) => {
  return {
    documentElements: state.documentElements
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Thumbnail);
