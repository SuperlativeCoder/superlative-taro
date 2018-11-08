import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import CheckBox from '../../../../components/CheckBox';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
  noUnderline: PropTypes.bool,
};

const defaultProps = {
  data: {},
  noUnderline: false,
};

class BillMonthList extends Component {
  render() {
    const { data: { isChecked }, noUnderline } = this.props;

    return (
      <View className="bill-month-list">
        <View class="checkbox">
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
