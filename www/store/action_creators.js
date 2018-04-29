import * as ActionTypes from './action_types';

export let addDocumentElements = (elements) => {
  return { type: ActionTypes.ADD_DOCUMENT_ELEMENTS, value: elements };
};

export let resetDocumentElements = () => {
  return { type: ActionTypes.RESET_DOCUMENT_ELEMENTS };
};

export let setTemporaryElements = (elements) => {
  return { type: ActionTypes.SET_TEMPORARY_ELEMENTS, value: elements };
};

export let resetTemporaryElements = () => {
  return { type: ActionTypes.RESET_TEMPORARY_ELEMENTS };
};

export let setEditor = (editor) => {
  return { type: ActionTypes.SET_EDITOR, value: editor };
};

export let resetEditor = () => {
  return { type: ActionTypes.RESET_EDITOR };
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

export let setShowModel = (show) => {
  return { type: ActionTypes.SET_SHOW_MODEL, value: show };
};

export let resetShowModel = () => {
  return { type: ActionTypes.RESET_SHOW_MODEL };
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
