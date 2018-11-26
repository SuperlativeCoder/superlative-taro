
import {
  GET_PROJECTS_BY_LOCATION,
  GET_ALL_CITIES,
  CHANGE_CURRENT_CITY,
  SET_CURRENT_LOCATION,
} from '../constants/choosingProject';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getProjectByLocation(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/projects`,
      type: GET_PROJECTS_BY_LOCATION,
      data,
      success,
      error,
    },
  };
}

export function getAllCities(success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/cities`,
      type: GET_ALL_CITIES,
      success,
      error,
    },
  };
}

export function changeCurrentCity(data) {
  return {
    type: CHANGE_CURRENT_CITY,
    payload: data,
  };
}

export function setCurrentLocation(data) {
  return {
    type: SET_CURRENT_LOCATION,
    payload: data,
  };
}

