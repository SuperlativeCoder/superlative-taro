import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import BillMonthList from '../BillMonthList';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
  currentParentIndex: PropTypes.number,
  onToggleCheckBoxShow: PropTypes.func,
};

const defaultProps = {
  data: {},
  currentParentIndex: -1,
  onToggleCheckBoxShow: () => {},
};

class BillYearList extends Component {
  render() {
    const { data: { year, billData }, currentParentIndex, onToggleCheckBoxShow } = this.props;

    return (
      <View className="bill-year-list">
        <View className="title">{year}年</View>
        {
          billData && billData.map((v, i) => <BillMonthList data={v} currentIndex={i} onToggleCheckBoxShow={onToggleCheckBoxShow} currentParentIndex={currentParentIndex} key={i} noUnderline={billData.length - 1 === i} />)
        }
      </View>
    );
  }
}

BillYearList.propTypes = propTypes;
BillYearList.defaultProps = defaultProps;

export default BillYearList;
