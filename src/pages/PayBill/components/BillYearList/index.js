import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import BillMonthList from '../BillMonthList';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
  currentParentIndex: PropTypes.number,
  toggleCheckBoxShow: PropTypes.func,
};

const defaultProps = {
  data: {},
  currentParentIndex: -1,
  toggleCheckBoxShow: () => {},
};

class BillYearList extends Component {
  render() {
    const { data: { year, testData }, currentParentIndex, toggleCheckBoxShow } = this.props;

    return (
      <View className="bill-year-list">
        <View className="title">{year}</View>
        {
          testData.map((v, i) => <BillMonthList data={v} currentIndex={i} toggleCheckBoxShow={toggleCheckBoxShow} currentParentIndex={currentParentIndex} key={i} noUnderline={testData.length - 1 === i} />)
        }
      </View>
    );
  }
}

BillYearList.propTypes = propTypes;
BillYearList.defaultProps = defaultProps;

export default BillYearList;
