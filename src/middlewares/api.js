import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_FAILURE } from '../constants';
import { CALL_API } from '../constants/symbols';

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (!callAPI) {
    return next(action);
  }

  const currStore = store.getState();
  const {
    type = '',
    url = '',
    success = () => {},
    fail = () => {},
    complete = () => {},
    responseCode = 200,
    data = null,
    header = {},
    method = 'GET',
  } = callAPI;

  function actionWith(otherData) {
    return Object.assign({}, action, otherData);
  }

  if (typeof url !== 'string') {
    throw new Error('Specify a string endpoint URL');
  }

  if (method === 'POST' && !Object.keys(data).length) {
    throw new Error('POST must has data param');
  }

  const requestOptions = {
    type,
    url,
    responseCode,
    data,
    header,
    method,
    success(res) {
      if (type) {
        next(actionWith({
          type: `${type}_${STATUS_SUCCESS}`,
          payload: res.data,
        }));
      }
      success();
    },
    fail(err) {
      if (type) {
        next(actionWith({
          type: `${type}_${STATUS_FAILURE}`,
          payload: err,
        }));
      }
      fail();
    },
    complete() {
      complete();
    },
  };

  // TODO: get token logic?
  if (currStore.user && currStore.user.token) {
    requestOptions.header.authorization = `Bearer ${currStore.user.token}`;
  }

  if (type) {
    next(actionWith({
      type: `${type}_${STATUS_REQUEST}`,
      payload: callAPI.data || {},
    }));
  }

  return wx.request(requestOptions);
};
