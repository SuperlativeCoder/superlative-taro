
import {
  GET_HOUSE_BY_BUILDING,
} from '../constants/choosingHouse';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getHouseByBuilding(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/projects/buildings/${data}/houses`,
      type: GET_HOUSE_BY_BUILDING,
      success,
      error,
    },
  };
}

export function bindingHouseByHouseCode(houseCode, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/binding/house`,
      type: GET_HOUSE_BY_BUILDING,
      method: 'POST',
      data: {
        house_code: houseCode,
      },
      success,
      error,
      responseCode: 200,
    },
  };
}

