import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import CheckBox from '../../../../components/CheckBox';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
  noUnderline: PropTypes.bool,
  currentIndex: PropTypes.number,
  currentParentIndex: PropTypes.number,
  onToggleCheckBoxShow: PropTypes.func,
};

const defaultProps = {
  data: {},
  noUnderline: false,
  currentIndex: -1,
  currentParentIndex: -1,
  onToggleCheckBoxShow: () => {},
};

class BillMonthList extends Component {
  onBillListClick() {
    const {
      currentIndex,
      currentParentIndex,
      onToggleCheckBoxShow,
      data: { isChecked },
    } = this.props;
    if (currentIndex > -1 && currentParentIndex > -1) {
      onToggleCheckBoxShow({ currentParentIndex, currentIndex, curChecked: isChecked });
    }
  }
  render() {
    const {
      data: {
        isChecked,
        month,
        shouldPayAmount,
        unpaidAmount,
      },
      noUnderline,
    } = this.props;

    return (
      <View className="bill-month-list">
        <View class="checkbox" onClick={this.onBillListClick}>
          <CheckBox isChecked={isChecked} />
        </View>
        <View class="content" style={{ borderBottom: noUnderline ? 'none' : '1rpx solid #eaeaea' }}>
          <View class="month">{month}月账单</View>
          <View class="money">
            <View class="total">¥ {shouldPayAmount}</View>
            <View class="to-pay">¥{unpaidAmount} 待缴</View>
          </View>
        </View>
      </View>
    );
  }
}

BillMonthList.propTypes = propTypes;
BillMonthList.defaultProps = defaultProps;

export default BillMonthList;
