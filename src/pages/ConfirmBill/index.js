import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
// import * as counterActions from '../../actions/counter';
import * as confirmBillActions from '../../actions/confirmBill';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import CustomButton from '../../components/CustomButton';
import BillYearList from './components/BillYearList';
import './index.scss';

const ICON_ARROW = require('../../public/images/arrow_grey_right.svg');

const propTypes = {
  // add: PropTypes.func,
  // minus: PropTypes.func,
  // asyncAdd: PropTypes.func,
  getUserBillData: PropTypes.func,
  toggleCheckBoxShow: PropTypes.func,
  // counter: PropTypes.shape({
  //   num: PropTypes.number,
  // }),
  payBill: PropTypes.shape({}),
};

const defaultProps = {
  // add: () => {},
  // minus: () => {},
  // asyncAdd: () => {},
  getUserBillData: () => {},
  toggleCheckBoxShow: () => {},
  // counter: {},
  payBill: {},
};


@connect(({ payBill }) => ({
  // counter,
  payBill,
}), combineActions({
  // ...counterActions,
  ...confirmBillActions,
}))

class PayBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavigateBarHidden: false,
    };
  }

  componentDidMount() {
    const { getUserBillData } = this.props;
    getUserBillData();
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  config = {
  }

  toIndexOne() {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  }

  toggleNavigateShow() {
    this.setState({
      isNavigateBarHidden: !this.state.isNavigateBarHidden,
    });
  }

  render() {
    const { isNavigateBarHidden } = this.state;
    const {
      add,
      minus,
      asyncAdd,
      toggleCheckBoxShow,
      getUserBillData,
      counter,
      payBill,
    } = this.props;
    const { bigTest } = payBill;

    return (
      <View className="pay-bill">
        <NavigationBar
          isNavigateBarHidden={isNavigateBarHidden}
          navigationBarBg="rgb(178, 149, 116)"
        />
        <View className="title" style={{}}>
          <HeaderTitle title="账单代缴" subTitle="当前房屋账单：金域华府1栋2单元B209" color="#fff" />
          <View className="capsule">
            <View className="text">其他房屋账单</View>
            {/* <Image className="" src="" /> */}
          </View>
        </View>
        <View className="bill-wrapper">
          {
            bigTest.map((v, i) => <BillYearList data={v} key={i} toggleCheckBoxShow={toggleCheckBoxShow} currentParentIndex={i} />)
          }
        </View>
        <View class="pay-bill-bottom">
          <View class="bill-total">
            实付金额：<Text class="bill">¥234.00</Text>
          </View>
          <CustomButton
            title="去缴费"
            style="width:288rpx;height:96rpx;"
          >
            <Image src={ICON_ARROW} />
          </CustomButton>
        </View>
      </View>
    );
  }
}

PayBill.propTypes = propTypes;
PayBill.defaultProps = defaultProps;

export default PayBill;
