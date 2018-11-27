import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_BUILDING_BY_PROJECT,
} from '../constants/choosingBuilding';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  buildings: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case request(GET_BUILDING_BY_PROJECT):
      return {
        ...state,
      };
    case success(GET_BUILDING_BY_PROJECT):
      return {
        ...state,
        buildings: payload,
      };
    case failure(GET_BUILDING_BY_PROJECT):
      return {
        ...state,
      };
    default:
      return state;
  }
};
