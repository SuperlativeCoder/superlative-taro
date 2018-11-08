import { TOGGLE_CHECKBOX_SHOW, GET_USER_BILL_DATA } from '../constants/payBill';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';
import { LOADING_STATUS } from '../constants/symbols';

const INITIAL_STATE = {
  num: 0,
}

export default function payBill(state = INITIAL_STATE, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case TOGGLE_CHECKBOX_SHOW:
      return {
        ...state,
      };
    case request(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    case success(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    case failure(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    default:
      return state;
  }
}
