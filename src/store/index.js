import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middlewares/api';

const middlewares = [
  api,
  thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger({
    collapsed: true,
    diff: true,
  }));
}

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}
