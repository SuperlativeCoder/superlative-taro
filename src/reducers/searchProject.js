import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_SEARCH_PROJECTS,
} from '../constants/searchProject';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  projects: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case request(GET_SEARCH_PROJECTS):
      return {
        ...state,

      };
    case success(GET_SEARCH_PROJECTS):
      return {
        ...state,
        projects: payload,
      };
    case failure(GET_SEARCH_PROJECTS):
      return {
        ...state,
      };
    default:
      return state;
  }
};
