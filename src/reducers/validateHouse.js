import LOADING_STATUS from '../constants/loadingStatus';
import {
  CHECK_HOUSE_CODE,
} from '../constants/choosingProject';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case success(CHECK_HOUSE_CODE):
      return {
        ...state,
        projects: payload,
      };
    default:
      return state;
  }
};
