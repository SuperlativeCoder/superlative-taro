
import {
  GET_BUILDING_BY_PROJECT,
} from '../constants/choosingBuilding';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getBuildingByProject(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/projects/${data}/buildings?page=1&per_page=200`,
      type: GET_BUILDING_BY_PROJECT,
      success,
      error,
    },
  };
}

