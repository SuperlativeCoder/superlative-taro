import { bindActionCreators } from 'redux';

export default (actionCreators) => {
  if (typeof actionCreators === 'object') {
    return function mapDisptchToProps(dispatch) {
      return bindActionCreators(actionCreators, dispatch);
    };
  }
  return actionCreators;
};
