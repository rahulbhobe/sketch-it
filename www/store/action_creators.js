import * as ActionTypes from './action_types';

let makeActionCreator = (type, valueFunc) => {
  return (...args) => {
    if (!valueFunc) return {type};
    return { type, value:  valueFunc(...args)};
  };
};

let identityFunc = value => value;

export let addPermanentElements   = makeActionCreator(ActionTypes.ADD_PERMANENT_ELEMENTS, identityFunc);
export let resetPermanentElements = makeActionCreator(ActionTypes.RESET_PERMANENT_ELEMENTS);

export let setTemporaryElements   = makeActionCreator(ActionTypes.SET_TEMPORARY_ELEMENTS, identityFunc);
export let resetTemporaryElements = makeActionCreator(ActionTypes.RESET_TEMPORARY_ELEMENTS);

export let setEditorElem          = makeActionCreator(ActionTypes.SET_EDITOR_ELEM, identityFunc);
export let resetEditorElem        = makeActionCreator(ActionTypes.RESET_EDITOR_ELEM);

export let setEditorCurve         = makeActionCreator(ActionTypes.SET_EDITOR_CURVE, identityFunc);
export let resetEditorCurve       = makeActionCreator(ActionTypes.RESET_EDITOR_CURVE);

export let addEditorPoints        = makeActionCreator(ActionTypes.ADD_EDITOR_POINTS, identityFunc);
export let resetEditorPoints      = makeActionCreator(ActionTypes.RESET_EDITOR_POINTS);

export let setEditorEvent         = makeActionCreator(ActionTypes.SET_EDITOR_EVENT, identityFunc);
export let resetEditorEvent       = makeActionCreator(ActionTypes.RESET_EDITOR_EVENT);


let eventDataMap = (type, position, otherData = {}) => {
  let startData = Object.assign(otherData, {position});
  return { type, startData };
};
export let setEventData           = makeActionCreator(ActionTypes.SET_EVENT_DATA, eventDataMap);
export let resetEventData         = makeActionCreator(ActionTypes.RESET_EVENT_DATA);

export let setZoomFactor          = makeActionCreator(ActionTypes.SET_ZOOM_FACTOR, identityFunc);
export let resetZoomFactor        = makeActionCreator(ActionTypes.RESET_ZOOM_FACTOR);

export let setUpVector            = makeActionCreator(ActionTypes.SET_UP_VECTOR, identityFunc);
export let resetUpVector          = makeActionCreator(ActionTypes.RESET_UP_VECTOR);

export let setOrigin              = makeActionCreator(ActionTypes.SET_ORIGIN, identityFunc);
export let resetOrigin            = makeActionCreator(ActionTypes.RESET_ORIGIN);

let canvasDimensionsMap = (width, height) => {
  return {width, height};
};
export let setCanvasDimensions    = makeActionCreator(ActionTypes.SET_CANVAS_DIMENSIONS, canvasDimensionsMap);


export let setShowViewer          = makeActionCreator(ActionTypes.SET_SHOW_VIEWER, identityFunc);
export let resetShowViewer        = makeActionCreator(ActionTypes.RESET_SHOW_VIEWER);

export let setModelName           = makeActionCreator(ActionTypes.SET_MODEL_NAME, identityFunc);
export let resetModelName         = makeActionCreator(ActionTypes.RESET_MODEL_NAME);

export let setModelThumbnail      = makeActionCreator(ActionTypes.SET_MODEL_THUMBNAIL, identityFunc);
export let resetModelThumbnail    = makeActionCreator(ActionTypes.RESET_MODEL_THUMBNAIL);

export let setModelDownloadUrl    = makeActionCreator(ActionTypes.SET_MODEL_DOWNLOADURL, identityFunc);
export let resetModelDownloadUrl  = makeActionCreator(ActionTypes.RESET_MODEL_DOWNLOADURL);
