import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
import * as counterActions from '../../actions/counter';
import * as payBillActions from '../../actions/payBill';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import BillYearList from './components/BillYearList';
import './index.scss';

const propTypes = {
  add: PropTypes.func,
  minus: PropTypes.func,
  asyncAdd: PropTypes.func,
  getUserBillData: PropTypes.func,
  toggleCheckBoxShow: PropTypes.func,
  counter: PropTypes.shape({
    num: PropTypes.number,
  }),
};

const defaultProps = {
  add: () => {},
  minus: () => {},
  asyncAdd: () => {},
  getUserBillData: () => {},
  toggleCheckBoxShow: () => {},
  counter: {},
};


@connect(({ counter, bigTest }) => ({
  counter,
  bigTest,
}), combineActions({
  ...counterActions,
  ...payBillActions,
}))

class PayBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavigateBarHidden: false,
      bigTest: [{
        testData: [{
          isChecked: false,
        }, {
          isChecked: true,
        }],
        year: 2017,
      }, {
        testData: [{
          isChecked: true,
        }, {
          isChecked: false,
        }],
        year: 2016,
      }],
    };
  }

  componentDidMount() {
    const { getUserBillData } = this.props;
    getUserBillData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  config = {
  }

  toIndexOne() {
    wx.navigateTo({
      url: '/pages/index1/index',
    });
  }

  toggleNavigateShow() {
    this.setState({
      isNavigateBarHidden: !this.state.isNavigateBarHidden,
    });
  }

  render() {
    const { isNavigateBarHidden, bigTest } = this.state;
    const {
      add,
      minus,
      asyncAdd,
      toggleCheckBoxShow,
      getUserBillData,
      counter,
    } = this.props;
    // console.log(bigTest, 'test');

    return (
      <View className="pay-bill">
        <NavigationBar
          isNavigateBarHidden={isNavigateBarHidden}
          navigationBarBg="rgb(178, 149, 116)"
        />
        <View className="title">
          <HeaderTitle title="账单代缴" subTitle="当前房屋账单：金域华府1栋2单元B209" color="#fff" />
          <View className="capsule">
            <View className="text">其他房屋账单</View>
            {/* <Image className="" src="" /> */}
          </View>
        </View>
        <View className="bill-wrapper">
          {
            bigTest.map((v, i) => <BillYearList data={v} key={i} />)
          }
        </View>
        <Button className="add_btn" onClick={add}>+</Button>
        <Button className="dec_btn" onClick={minus}>-</Button>
        <Button className="dec_btn" onClick={asyncAdd}>async</Button>
        <Button className="dec_btn" onClick={toggleCheckBoxShow}>toggleCheckBoxShow</Button>
        <Button className="dec_btn" onClick={getUserBillData}>getUserBillDataAction</Button>
        <Button className="dec_btn" onClick={this.toIndexOne}>to index1</Button>
        <Button onClick={this.toggleNavigateShow.bind(this)}>toggle navigate show</Button>
        <View><Text>{counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

PayBill.propTypes = propTypes;
PayBill.defaultProps = defaultProps;

export default PayBill;
