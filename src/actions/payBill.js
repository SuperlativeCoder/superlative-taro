
import {
  TOGGLE_CHECKBOX_SHOW,
  GET_USER_BILL_DATA,
} from '../constants/payBill';
console.log(GET_USER_BILL_DATA, 'GET_USER_BILL_DATA')
import { MOCK_HOST } from '../constants/host';
import { CALL_API } from '../constants/symbols';

export function toggleCheckBoxShow(index) {
  return {
    type: TOGGLE_CHECKBOX_SHOW,
    payload: index,
  };
}

export function getUserBillData(success, error) {
  return {
    [CALL_API]: {
      url: `${MOCK_HOST}/app/mock/64/GET/1`,
      type: GET_USER_BILL_DATA,
      success,
      error,
    },
  };
}
