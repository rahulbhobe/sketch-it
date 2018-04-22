import React from 'react';

class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick () {
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
