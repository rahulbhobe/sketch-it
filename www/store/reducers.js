import {combineReducers} from 'redux';
import * as ActionTypes from './action_types';

let documentElementsReducer = (state, action) => {
  let init = [];
  if (action.type === ActionTypes.ADD_DOCUMENT_ELEMENTS) {
    return state.concat(action.value);
  } else if (action.type === ActionTypes.RESET_DOCUMENT_ELEMENTS) {
    return init;
  }
  return state || init;
};

let temporaryElementsReducer = (state, action) => {
  let init = [];
  if (action.type === ActionTypes.SET_TEMPORARY_ELEMENTS) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_TEMPORARY_ELEMENTS) {
    return init;
  }
  return state || init;
};

let editorElemReducer = (state, action) => {
  let init = 'none';
  if (action.type === ActionTypes.SET_EDITOR_ELEM) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EDITOR_ELEM) {
    return init;
  }
  return state || init;
};

let editorCurveReducer = (state, action) => {
  let init = 'none';
  if (action.type === ActionTypes.SET_EDITOR_CURVE) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EDITOR_CURVE) {
    return init;
  }
  return state || init;
};

let editorPointsReducer = (state, action) => {
  let init = [];
  if (action.type === ActionTypes.ADD_EDITOR_POINTS) {
    return state.concat(action.value);
  } else if (action.type === ActionTypes.RESET_EDITOR_POINTS) {
    return init;
  }
  return state || init;
};

let editorEventReducer = (state, action) => {
  let init = null;
  if (action.type === ActionTypes.SET_EDITOR_EVENT) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EDITOR_EVENT) {
    return init;
  }
  return state || init;
};

let eventDataReducer = (state, action) => {
  let init = {type: 'none', startData: null};
  if (action.type === ActionTypes.SET_EVENT_DATA) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_EVENT_DATA) {
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

let showModelReducer = (state, action) => {
  let init = false;
  if (action.type === ActionTypes.SET_SHOW_MODEL) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_SHOW_MODEL) {
    return init;
  }
  return state || init;
};

let modelNameReducer = (state, action) => {
  let init = '';
  if (action.type === ActionTypes.SET_MODEL_NAME) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_MODEL_NAME) {
    return init;
  }
  return state || init;
};

let modelThumbnailReducer = (state, action) => {
  let init = '';
  if (action.type === ActionTypes.SET_MODEL_THUMBNAIL) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_MODEL_THUMBNAIL) {
    return init;
  }
  return state || init;
};

let modelDownloadUrlReducer = (state, action) => {
  let init = '';
  if (action.type === ActionTypes.SET_MODEL_DOWNLOADURL) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_MODEL_DOWNLOADURL) {
    return init;
  }
  return state || init;
};

let reducers = combineReducers({
  documentElements: documentElementsReducer,
  temporaryElements: temporaryElementsReducer,
  editorElem: editorElemReducer,
  editorCurve: editorCurveReducer,
  editorPoints: editorPointsReducer,
  editorEvent: editorEventReducer,
  eventData: eventDataReducer,
  zoomFactor: zoomFactorReducer,
  upVector: upVectorReducer,
  origin: originReducer,
  canvasDimensions: canvasDimensionsReducer,
  showModel: showModelReducer,
  modelName: modelNameReducer,
  modelThumbnail: modelThumbnailReducer,
  modelDownloadUrl: modelDownloadUrlReducer
});

export default reducers;
