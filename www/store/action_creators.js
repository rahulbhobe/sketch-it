import * as ActionTypes from './action_types';

export let setEventData = (type, position, otherData = {}) => {
  return { type: ActionTypes.SET_EVENT_DATA, value: {type, startData: Object.assign(otherData, {position}) } };
};

export let resetEventData = () => {
  return { type: ActionTypes.RESET_EVENT_DATA, value: {type: 'none', startData: null} };
};

export let setZoomFactor = (zoomFactor) => {
  return { type: ActionTypes.SET_ZOOM_FACTOR, value: zoomFactor };
};

export let resetZoomFactor = () => {
  return { type: ActionTypes.RESET_ZOOM_FACTOR, value: 100 };
};

export let setRotationAngle = (rotationAngle) => {
  return { type: ActionTypes.SET_ROTATION_ANGLE, value: rotationAngle };
};

export let resetRotationAngle = () => {
  return { type: ActionTypes.RESET_ROTATION_ANGLE, value: 0 };
};

export let setOrigin = (origin) => {
  return { type: ActionTypes.SET_ORIGIN, value: origin };
};

export let resetOrigin = () => {
  return { type: ActionTypes.RESET_ORIGIN, value: {x: 0, y: 0} };
};
