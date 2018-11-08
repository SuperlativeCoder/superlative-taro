import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import BillMonthList from '../BillMonthList';
import './index.scss';

const propTypes = {
  data: PropTypes.shape({}),
};

const defaultProps = {
  data: {},
};

class BillYearList extends Component {
  render() {
    const { data: { year, testData } } = this.props;

    return (
      <View className="bill-year-list">
        <View className="title">{year}</View>
        {
          testData.map((v, i) => <BillMonthList data={v} key={i} noUnderline={testData.length - 1 === i} />)
        }
      </View>
    );
  }
}

BillYearList.propTypes = propTypes;
BillYearList.defaultProps = defaultProps;

export default BillYearList;
