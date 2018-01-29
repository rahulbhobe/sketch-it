import {combineReducers} from 'redux';
import * as ActionTypes from './action_types';

let dataReducer = (state=null, action) => {
  if (action.type === ActionTypes.SET_DATA) {
    return action.value;
  } else if (action.type === ActionTypes.RESET_DATA) {
    return action.value;
  }
  return state;
};

let reducers = combineReducers({
  data: dataReducer
});

export default reducers;
