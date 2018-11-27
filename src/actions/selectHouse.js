
import {
  GET_BINDING_HOUSES,
} from '../constants/selectHouse';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getBindingHouses(success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/nf/v1/binding/houses`,
      type: GET_BINDING_HOUSES,
      success,
      error,
      responseCode: 200,
    },
  };
}
