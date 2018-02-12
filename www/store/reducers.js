import {combineReducers} from 'redux';
import * as ActionTypes from './action_types';

let setEventDataReducer = (state= {type: 'none', startData: null}, action) => {
  if (action.type === ActionTypes.SET_EVENT_DATA) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EVENT_DATA) {
    return action.value;
  }
  return state;
};

let zoomFactorReducer = (state=100, action) => {
  if (action.type === ActionTypes.SET_ZOOM_FACTOR) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_ZOOM_FACTOR) {
    return action.value;
  }
  return state;
};

let rotationAngleReducer = (state=0, action) => {
  if (action.type === ActionTypes.SET_ROTATION_ANGLE) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_ROTATION_ANGLE) {
    return action.value;
  }
  return state;
};

let originReducer = (state={x:0, y:0}, action) => {
  if (action.type === ActionTypes.SET_ORIGIN) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_ORIGIN) {
    return action.value;
  }
  return state;
};

let canvasDimensionsReducer = (state={width:-1, height:-1}, action) => {
  if (action.type === ActionTypes.SET_CANVAS_DIMENSIONS) {
    return action.value;
  }
  return state;
};

let reducers = combineReducers({
  eventData: setEventDataReducer,
  zoomFactor: zoomFactorReducer,
  rotationAngle: rotationAngleReducer,
  origin: originReducer,
  canvasDimensions: canvasDimensionsReducer
});

export default reducers;
