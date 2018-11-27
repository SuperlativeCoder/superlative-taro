
import {
  CHECK_HOUSE_CODE,
} from '../constants/validateHouse';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function checkHouseCode(safeCode, houseCode, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/binding/house`,
      type: CHECK_HOUSE_CODE,
      method: 'POST',
      data: {
        safe_code: safeCode,
        house_code: houseCode,
      },
      success,
      error,
      responseCode: 200,
    },
  };
}
