import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_BINDING_HOUSES,
} from '../constants/selectHouse';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  houses: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case request(GET_BINDING_HOUSES):
      return {
        ...state,
      };
    case success(GET_BINDING_HOUSES):
      return {
        ...state,
        houses: payload,
      };
    case failure(GET_BINDING_HOUSES):
      return {
        ...state,
      };
    default:
      return state;
  }
};
