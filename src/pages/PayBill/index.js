import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
import { add, minus, asyncAdd } from '../../actions/counter';
import { toggleCheckBoxShow, getUserBillData } from '../../actions/payBill';
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


@connect(({ counter }) => ({
  counter,
}), combineActions({
  add,
  minus,
  asyncAdd,
  toggleCheckBoxShow,
  getUserBillData,
}))
// @connect(({ counter }) => ({
//   counter,
// }), dispatch => ({
//   add() {
//     dispatch(add());
//   },
//   dec() {
//     dispatch(minus());
//   },
//   asyncAdd() {
//     dispatch(asyncAdd());
//   },
//   toggleCheckBoxShow() {
//     dispatch(toggleCheckBoxShow());
//   },
//   getUserBillDataAction() {
//     dispatch(getUserBillData());
//   },
// }))
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
    console.log(111);
    const { getUserBillData } = this.props;
    getUserBillData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  config = {
  }

  // componentDidShow() { console.log(2); }

  // componentDidHide() { }

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
            bigTest.map(v => <BillYearList data={v} />)
          }
        </View>
        <Button className="add_btn" onClick={this.props.add}>+</Button>
        <Button className="dec_btn" onClick={this.props.minus}>-</Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>async</Button>
        <Button className="dec_btn" onClick={this.props.toggleCheckBoxShow}>toggleCheckBoxShow</Button>
        <Button className="dec_btn" onClick={this.props.getUserBillData}>getUserBillDataAction</Button>
        <Button className="dec_btn" onClick={this.toIndexOne}>to index1</Button>
        <Button onClick={this.toggleNavigateShow.bind(this)}>toggle navigate show</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

PayBill.propTypes = propTypes;
PayBill.defaultProps = defaultProps;

export default PayBill;
