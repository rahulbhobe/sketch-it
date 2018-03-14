import {combineReducers} from 'redux';
import * as ActionTypes from './action_types';

let eventDataReducer = (state, action) => {
  let init = {type: 'none', startData: null};
  if (action.type === ActionTypes.SET_EVENT_DATA) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EVENT_DATA) {
    return init;
  }
  return state || init;
};

let editorReducer = (state, action) => {
  let init = null;
  if (action.type === ActionTypes.SET_EDITOR) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EDITOR) {
    return init;
  }
  return state || init;
};

let zoomFactorReducer = (state, action) => {
  let init = 100;
  if (action.type === ActionTypes.SET_ZOOM_FACTOR) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_ZOOM_FACTOR) {
    return init;
  }
  return state || init;
};

let upVectorReducer = (state, action) => {
  let init = {x:0, y:1};
  if (action.type === ActionTypes.SET_UP_VECTOR) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_UP_VECTOR) {
    return init;
  }
  return state || init;
};

let originReducer = (state, action) => {
  let init = {x:0, y:0};
  if (action.type === ActionTypes.SET_ORIGIN) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_ORIGIN) {
    return init;
  }
  return state || init;
};

let canvasDimensionsReducer = (state, action) => {
  let init = {width:-1, height:-1};
  if (action.type === ActionTypes.SET_CANVAS_DIMENSIONS) {
    return action.value;
  }
  return state || init;
};

let reducers = combineReducers({
  eventData: eventDataReducer,
  editor: editorReducer,
  zoomFactor: zoomFactorReducer,
  upVector: upVectorReducer,
  origin: originReducer,
  canvasDimensions: canvasDimensionsReducer
});

export default reducers;
