import * as ActionTypes from './action_types';

export let setData = (data) => {
  return { type: ActionTypes.SET_DATA, value: data };
};

export let resetData = () => {
  return { type: ActionTypes.RESET_DATA, value: null };
};

