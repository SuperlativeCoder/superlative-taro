
import {
  GET_USER_DATA_BY_CODE,
} from '../constants/authLanding';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getUserDataByCode(code, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/binding/wx?code=${code}`,
      type: GET_USER_DATA_BY_CODE,
      success,
      error,
      responseCode: 200,
    },
  };
}

