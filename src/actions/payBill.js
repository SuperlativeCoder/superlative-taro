
import {
  GET_ORDER_PAY_CONFIG,
} from '../constants/payBill';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getOrderPayConfig(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/payment/wx`,
      data: {
        house_code: data.houseCode,
        end_date: data.endDate,
      },
      method: 'POST',
      type: GET_ORDER_PAY_CONFIG,
      success,
      error,
      responseCode: 200,
    },
  };
}
