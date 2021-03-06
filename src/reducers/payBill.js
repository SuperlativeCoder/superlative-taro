import LOADING_STATUS from '../constants/loadingStatus';
import {
  GET_ORDER_PAY_CONFIG,
} from '../constants/payBill';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  paymentConfig: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case request(GET_ORDER_PAY_CONFIG):
      return {
        ...state,
      };
    case success(GET_ORDER_PAY_CONFIG):
      return {
        ...state,
        paymentConfig: payload,
      };
    case failure(GET_ORDER_PAY_CONFIG):
      return {
        ...state,
      };
    default:
      return state;
  }
};
