import LOADING_STATUS from '../constants/loadingStatus';
import {
  TOGGLE_CHECK_STATUS,
  GET_USER_BILL_DATA,
} from '../constants/confirmBill';
import {
  request,
  success,
  failure,
} from '../constants/actionTypes';

const initialState = {
  hisCharge: 0,
  totalCharge: 0,
  billList: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
};

function billListDataFormatter(state, payload) {
  const billListRepeat = payload.bill_list || [];
  const billListFormated = {};
  const billListArr = [];

  for (let i = 0, len = billListRepeat.length; i < len; i++) {
    const index = len - 1 - i;
    const billDateStr = billListRepeat[index].billing_cycle_id + '';
    const billYear = billDateStr.slice(0, 4);
    billListRepeat[index].month = billDateStr.slice(4, 6);
    billListRepeat[index].isChecked = true;
    billListRepeat[index].shouldPayAmount = (billListRepeat[index].should_pay_amount / 100).toFixed(2);
    billListRepeat[index].unpaidAmount = (billListRepeat[index].unpaid_amount / 100).toFixed(2);

    if (billListFormated[billYear]) {
      billListFormated[billYear].push(billListRepeat[index]);
    } else {
      billListFormated[billYear] = [billListRepeat[index]];
    }
  }

  for (const key in billListFormated) {
    billListArr.push({
      year: key,
      billData: billListFormated[key],
    });
  }

  return {
    ...state,
    hisCharge: payload.his_charge,
    totalCharge: (payload.total_charge / 100).toFixed(2),
    billList: billListArr,
  };
}

function toggleCheckStatus(state, payload) {
  const billListRepeat = JSON.parse(JSON.stringify(state.billList));
  const index = payload.index;
  const subIndex = payload.subIndex;
  const checkStatusBefore = billListRepeat[index].billData[subIndex].isChecked;
  const curIndexUnpaidAmount = parseFloat(billListRepeat[index].billData[subIndex].unpaidAmount, 10);
  const totalCharge = parseFloat(state.totalCharge, 10);
  let chagedTotalCharge;

  billListRepeat[index].billData[subIndex].isChecked = !checkStatusBefore;
  if (checkStatusBefore) {
    chagedTotalCharge = (totalCharge - curIndexUnpaidAmount).toFixed(2);
  } else {
    chagedTotalCharge = (totalCharge + curIndexUnpaidAmount).toFixed(2);
  }

  return {
    ...state,
    billList: billListRepeat,
    totalCharge: chagedTotalCharge,
  };
}

export default (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case TOGGLE_CHECK_STATUS:
      return toggleCheckStatus(state, payload);
    case request(GET_USER_BILL_DATA):
      return {
        ...state,
      };
    case success(GET_USER_BILL_DATA):
      return billListDataFormatter(state, payload);
    case failure(GET_USER_BILL_DATA):
      return {
        ...state,
        hisCharge: 0,
        totalCharge: 0,
        billList: null,
      };
    default:
      return state;
  }
};
