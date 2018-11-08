import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

// import combineActions from '../../../../middlewares/combineActions';
// import * as payBillActions from '../../../../actions/payBill';
import CheckBox from '../../../../components/CheckBox';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
  noUnderline: PropTypes.bool,
  currentIndex: PropTypes.number,
  currentParentIndex: PropTypes.number,
  toggleCheckBoxShow: PropTypes.func,
};

const defaultProps = {
  data: {},
  noUnderline: false,
  currentIndex: -1,
  currentParentIndex: -1,
  toggleCheckBoxShow: () => {},
};

// @connect(({ bigTest }) => ({ bigTest }), combineActions({
//   ...payBillActions,
// }))
class BillMonthList extends Component {
  onBillListClick() {
    console.log(this, this.props)
    const {
      currentIndex,
      currentParentIndex,
      toggleCheckBoxShow,
      data: { isChecked },
    } = this.props;
    if (currentIndex > -1 && currentParentIndex > -1) {
      toggleCheckBoxShow({ currentParentIndex, currentIndex, curChecked: isChecked });
    }
  }
  render() {
    const { data: { isChecked }, noUnderline } = this.props;

    return (
      <View className="bill-month-list">
        <View class="checkbox" onClick={this.onBillListClick}>
          <CheckBox isChecked={isChecked} />
        </View>
        <View class="content" style={{ borderBottom: noUnderline ? 'none' : '1rpx solid #eaeaea' }}>
          <View class="month">2月账单</View>
          <View class="money">
            <View class="total">¥ 274.73</View>
            <View class="to-pay">¥50.00 待缴</View>
          </View>
        </View>
      </View>
    );
  }
}

BillMonthList.propTypes = propTypes;
BillMonthList.defaultProps = defaultProps;

export default BillMonthList;
