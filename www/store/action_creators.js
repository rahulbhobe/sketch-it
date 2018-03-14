import * as ActionTypes from './action_types';

export let addDocumentElements = (element) => {
  return { type: ActionTypes.ADD_DOCUMENT_ELEMENTS, value: element };
};

export let resetDocumentElements = () => {
  return { type: ActionTypes.RESET_DOCUMENT_ELEMENTS };
};

export let addTemporaryElements = (element) => {
  return { type: ActionTypes.SET_TEMPORARY_ELEMENTS, value: element };
};

export let resetTemporaryElements = () => {
  return { type: ActionTypes.RESET_TEMPORARY_ELEMENTS };
};

export let setEventData = (type, position, otherData = {}) => {
  return { type: ActionTypes.SET_EVENT_DATA, value: {type, startData: Object.assign(otherData, {position}) } };
};

export let resetEventData = () => {
  return { type: ActionTypes.RESET_EVENT_DATA };
};

export let setEditor = (editor) => {
  return { type: ActionTypes.SET_EDITOR, value: editor };
};

export let resetEditor = () => {
  return { type: ActionTypes.RESET_EDITOR };
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
