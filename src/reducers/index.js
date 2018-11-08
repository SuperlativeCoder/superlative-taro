import { combineReducers } from 'redux';
import counter from './counter';
import payBill from './payBill';

export default combineReducers({
  counter,
  payBill,
});
