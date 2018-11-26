
import {
  CHECK_HOUSE_CODE,
} from '../constants/choosingBuilding';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function checkHouseCode(houseCode, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/cities`,
      type: CHECK_HOUSE_CODE,
      success,
      error,
    },
  };
}
