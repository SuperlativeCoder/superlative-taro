import { combineReducers } from 'redux';

import confirmBill from './confirmBill';
import authLanding from './authLanding';
import choosingProject from './choosingProject';
import choosingBuilding from './choosingBuilding';
import choosingHouse from './choosingHouse';
import selectHouse from './selectHouse';
import searchProject from './searchProject';
import validateHouse from './validateHouse';
import payBill from './payBill';

export default combineReducers({
  confirmBill,
  authLanding,
  choosingProject,
  choosingBuilding,
  choosingHouse,
  selectHouse,
  validateHouse,
  searchProject,
  payBill,
});
