import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_HOUSE_BY_BUILDING,
} from '../constants/choosingHouse';
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
    case request(GET_HOUSE_BY_BUILDING):
      return {
        ...state,

      };
    case success(GET_HOUSE_BY_BUILDING):
      return {
        ...state,
        houses: payload,
      };
    case failure(GET_HOUSE_BY_BUILDING):
      return {
        ...state,
      };
    default:
      return state;
  }
};
