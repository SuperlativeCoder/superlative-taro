
import {
  GET_BINDING_HOUSES,
} from '../constants/selectHouse';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function getBindingHouses(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.MOCK_HOST}/app/mock/68/GET//nf/v1/binding/houses`,
      type: GET_BINDING_HOUSES,
      success,
      error,
    },
  };
}
