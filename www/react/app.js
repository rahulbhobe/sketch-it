import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store/store';
import SketchIt from './sketch_it';

document.addEventListener("DOMContentLoaded", (event) => {
  ReactDOM.render(
    <Provider store={store}>
      <SketchIt />
    </Provider>,
    document.getElementById('body-div')
  );
});
