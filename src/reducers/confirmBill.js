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
import { HOUSE_DATA, AUTH } from '../constants/localStorage';

const initialState = {
  hisCharge: 0,
  totalCharge: '0.00',
  billList: null,
  loadingStatus: LOADING_STATUS.DEFAULT,
  extraData: null,
};

function billListDataFormatter(state, payload) {
  const billListRepeat = payload.bill_list || [];
  const billListFormated = {};
  const billListArr = [];
  const houseData = wx.getStorageSync(HOUSE_DATA);
  const { ticket } = wx.getStorageSync(AUTH);
  const {
    name: houseName,
    code: houseCode,
  } = houseData.house;
  let endDate;
  const totalCharge = (payload.total_charge / 100).toFixed(2);

  for (let i = 0, len = billListRepeat.length; i < len; i += 1) {
    const index = len - 1 - i;
    const billDateStr = `${billListRepeat[index].billing_cycle_id}`;
    const billYear = billDateStr.slice(0, 4);
    endDate = billListRepeat[i].billing_cycle_id;
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
    if ({}.hasOwnProperty.call(billListFormated, key)) {
      billListArr.push({
        year: key,
        billData: billListFormated[key],
      });
    }
  }
  console.log({
    endDate,
    houseCode,
    houseName,
    totalCharge,
    ticket,
  }, '12312312321')
  return {
    ...state,
    hisCharge: payload.his_charge,
    totalCharge,
    billList: billListArr,
    extraData: {
      endDate,
      houseCode,
      houseName,
      totalCharge,
      ticket,
    },
  };
}

function toggleCheckStatus(state, payload) {
  const billListRepeat = JSON.parse(JSON.stringify(state.billList));
  const { index, subIndex } = payload;
  const checkStatusBefore = billListRepeat[index].billData[subIndex].isChecked;
  const curIndexUnpaidAmount = parseFloat(billListRepeat[index].billData[subIndex].unpaidAmount, 10);
  const totalCharge = parseFloat(state.totalCharge, 10);
  const currentSelectData = billListRepeat[index].billData[subIndex];
  let chagedTotalCharge;
  let endDate;

  currentSelectData.isChecked = !checkStatusBefore;
  // 之前是选中状态, 则选择当前的下一个作为结束时间
  if (checkStatusBefore) {
    chagedTotalCharge = (totalCharge - curIndexUnpaidAmount).toFixed(2);
    if (subIndex < billListRepeat[index].billData.length - 1) {
      endDate = billListRepeat[index].billData[subIndex + 1].billing_cycle_id;
    } else if (index < billListRepeat.length - 1) {
      endDate = billListRepeat[index + 1].billData[0].billing_cycle_id;
    } else {
      endDate = '';
    }
  // 未选中状态, 则选择当前为结束时间
  } else {
    chagedTotalCharge = (totalCharge + curIndexUnpaidAmount).toFixed(2);
    endDate = currentSelectData.billing_cycle_id;
  }

  return {
    ...state,
    billList: billListRepeat,
    totalCharge: chagedTotalCharge,
    extraData: {
      ...state.extraData,
      endDate,
      totalCharge: chagedTotalCharge,
    },
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
        totalCharge: '0.00',
        billList: null,
      };
    default:
      return state;
  }
};
