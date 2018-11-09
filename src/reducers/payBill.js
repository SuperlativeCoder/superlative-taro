import { TOGGLE_CHECKBOX_SHOW, GET_USER_BILL_DATA } from '../constants/payBill';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';
import { LOADING_STATUS } from '../constants/symbols';

const INITIAL_STATE = {
  bigTest: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

export default function payBill(state = INITIAL_STATE, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case TOGGLE_CHECKBOX_SHOW:
      const bigTestRepeat = JSON.parse(JSON.stringify(state.bigTest));
      bigTestRepeat[payload.currentParentIndex].testData[payload.currentIndex].isChecked = !payload.curChecked
      return {
        ...state,
        bigTest: bigTestRepeat,
      };
    case request(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    case success(GET_USER_BILL_DATA):
      return {
        ...state,
        bigTest: payload.result.bigTest,
      };
    case failure(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    default:
      return state;
  }
}
