
import {
  TOGGLE_CHECK_STATUS,
  GET_USER_BILL_DATA,
} from '../constants/confirmBill';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function toggleCheckStatus(data) {
  return {
    type: TOGGLE_CHECK_STATUS,
    payload: data,
  };
}

export function getUserBillData(houseCode, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/bills/simple?house_code=${houseCode}`,
      // url: `${MOCK_HOST}/app/mock/64/GET//nf/v1/bills/simple`,
      type: GET_USER_BILL_DATA,
      success,
      error,
      responseCode: 200,
    },
  };
}

