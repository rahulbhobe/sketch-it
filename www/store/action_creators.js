import * as ActionTypes from './action_types';

export let addPermanentElements = (elements) => {
  return { type: ActionTypes.ADD_PERMANENT_ELEMENTS, value: elements };
};

export let resetPermanentElements = () => {
  return { type: ActionTypes.RESET_PERMANENT_ELEMENTS };
};

export let setTemporaryElements = (elements) => {
  return { type: ActionTypes.SET_TEMPORARY_ELEMENTS, value: elements };
};

export let resetTemporaryElements = () => {
  return { type: ActionTypes.RESET_TEMPORARY_ELEMENTS };
};

export let setEditorElem = (elem) => {
  return { type: ActionTypes.SET_EDITOR_ELEM, value: elem };
};

export let resetEditorElem = () => {
  return { type: ActionTypes.RESET_EDITOR_ELEM };
};

export let setEditorCurve = (curve) => {
  return { type: ActionTypes.SET_EDITOR_CURVE, value: curve };
};

export let resetEditorCurve = () => {
  return { type: ActionTypes.RESET_EDITOR_CURVE };
};

export let addEditorPoints = (points) => {
  return { type: ActionTypes.ADD_EDITOR_POINTS, value: points };
};

export let resetEditorPoints = () => {
  return { type: ActionTypes.RESET_EDITOR_POINTS };
};

export let setEditorEvent = (data) => {
  return { type: ActionTypes.SET_EDITOR_EVENT, value: data };
};

export let resetEditorEvent = () => {
  return { type: ActionTypes.RESET_EDITOR_EVENT };
};

export let setEventData = (type, position, otherData = {}) => {
  return { type: ActionTypes.SET_EVENT_DATA, value: {type, startData: Object.assign(otherData, {position}) } };
};

export let resetEventData = () => {
  return { type: ActionTypes.RESET_EVENT_DATA };
};

export let setZoomFactor = (zoomFactor) => {
  return { type: ActionTypes.SET_ZOOM_FACTOR, value: zoomFactor };
};

export let resetZoomFactor = () => {
  return { type: ActionTypes.RESET_ZOOM_FACTOR };
};

export let setUpVector = (upVector) => {
  return { type: ActionTypes.SET_UP_VECTOR, value: upVector };
};

export let resetUpVector = () => {
  return { type: ActionTypes.RESET_UP_VECTOR };
};

export let setOrigin = (origin) => {
  return { type: ActionTypes.SET_ORIGIN, value: origin };
};

export let resetOrigin = () => {
  return { type: ActionTypes.RESET_ORIGIN };
};

export let setCanvasDimensions = (width, height) => {
  return { type: ActionTypes.SET_CANVAS_DIMENSIONS, value: {width, height} };
};

export let setShowViewer = (show) => {
  return { type: ActionTypes.SET_SHOW_VIEWER, value: show };
};

export let resetShowViewer = () => {
  return { type: ActionTypes.RESET_SHOW_VIEWER };
};

export let setModelName = (name) => {
  return { type: ActionTypes.SET_MODEL_NAME, value: name };
};

export let resetModelName = () => {
  return { type: ActionTypes.RESET_MODEL_NAME };
};

export let setModelThumbnail = (thumbnail) => {
  return { type: ActionTypes.SET_MODEL_THUMBNAIL, value: thumbnail };
};

export let resetModelThumbnail = () => {
  return { type: ActionTypes.RESET_MODEL_THUMBNAIL };
};

export let setModelDownloadUrl = (url) => {
  return { type: ActionTypes.SET_MODEL_DOWNLOADURL, value: url };
};

export let resetModelDownloadUrl = () => {
  return { type: ActionTypes.RESET_MODEL_DOWNLOADURL };
};
