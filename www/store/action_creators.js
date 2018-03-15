import * as ActionTypes from './action_types';

export let addDocumentElements = (elements) => {
  return { type: ActionTypes.ADD_DOCUMENT_ELEMENTS, value: elements };
};

export let resetDocumentElements = () => {
  return { type: ActionTypes.RESET_DOCUMENT_ELEMENTS };
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
