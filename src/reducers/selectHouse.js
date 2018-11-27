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
        loadingStatus: LOADING_STATUS.BEGIN,
      };
    case success(GET_BINDING_HOUSES):
      return {
        ...state,
        houses: payload.houses.map((v) => {
          v.subName = v.house_name.split(v.project_name)[1];
          v.code = v.house_code;
          v.name = v.house_name;
          return v;
        }),
        loadingStatus: LOADING_STATUS.SUCCESS,
      };
    case failure(GET_BINDING_HOUSES):
      return {
        ...state,
        loadingStatus: LOADING_STATUS.FAILURE,
      };
    default:
      return state;
  }
};
