import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_PROJECTS_BY_LOCATION,
  GET_ALL_CITIES,
  CHANGE_CURRENT_CITY,
  SET_CURRENT_LOCATION,
} from '../constants/choosingProject';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  cities: null,
  projects: null,
  currentCity: {
    name: '--',
    code: '440300',
  },
  currentLocation: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case request(GET_PROJECTS_BY_LOCATION):
      return {
        ...state,
        loadingStatus: LOADING_STATUS.BEGIN,
      };
    case success(GET_PROJECTS_BY_LOCATION):
      return {
        ...state,
        projects: payload,
        loadingStatus: LOADING_STATUS.SUCCESS,
      };
    case failure(GET_PROJECTS_BY_LOCATION):
      return {
        ...state,
      };
    case success(GET_ALL_CITIES):
      return {
        ...state,
        cities: payload,
      };
    case CHANGE_CURRENT_CITY:
      return {
        ...state,
        currentCity: payload,
      };
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
    default:
      return state;
  }
};
