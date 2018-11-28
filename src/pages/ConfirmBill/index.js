import Taro, { Component } from '@tarojs/taro';
import { View, Navigator, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
// import * as counterActions from '../../actions/counter';
import * as confirmBillActions from '../../actions/confirmBill';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import CustomButton from '../../components/CustomButton';
import EmptyPage from '../../components/EmptyPage';
import { isIOS, STATUSBAR_HEIGHT, ANDROID_NAVBAR_HEIGHT, IOS_NAVBAR_HEIGHT } from '../../constants/weapp';
import { HOUSE_DATA } from '../../constants/localStorage';
import BillYearList from './components/BillYearList';
import './index.scss';

import ICON_YELLOW_RIGHT from '../../public/images/arrow_shityellow_right.svg';
import ICON_ARROW from '../../public/images/arrow_grey_right.svg';

const COLOR_GREY = 'rgb(178,149,116)';

const propTypes = {
  // add: PropTypes.func,
  // minus: PropTypes.func,
  // asyncAdd: PropTypes.func,
  getUserBillData: PropTypes.func,
  toggleCheckBoxShow: PropTypes.func,
  // counter: PropTypes.shape({
  //   num: PropTypes.number,
  // }),
  confirmBill: PropTypes.shape({
    totalCharge: PropTypes.number,
  }),
};

const defaultProps = {
  // add: () => {},
  // minus: () => {},
  // asyncAdd: () => {},
  getUserBillData: () => {},
  toggleCheckBoxShow: () => {},
  // counter: {},
  confirmBill: {},
};


@connect(({ confirmBill }) => ({
  // counter,
  confirmBill,
}), combineActions({
  // ...counterActions,
  ...confirmBillActions,
}))

class confirmBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationHeight: isIOS ? (STATUSBAR_HEIGHT + IOS_NAVBAR_HEIGHT) * 2 : (STATUSBAR_HEIGHT + ANDROID_NAVBAR_HEIGHT) * 2,
      projectMsg: '',
    };
  }

  componentWillMount() {
    const houseData = wx.getStorageSync(HOUSE_DATA);
    const { house } = houseData;
    if (house) {
      this.setState({
        projectMsg: house.name,
      });
    }
  }

  componentDidMount() {
    const houseData = wx.getStorageSync(HOUSE_DATA);
    const { house } = houseData;
    if (house) {
      this.props.getUserBillData(house.code, () => {
      }, (err) => {
        wx.showToast({
          title: err.message || '获取账单错误',
          icon: 'none',
        });
      });
    }
  }

  onToOtherHouseTap() {
    wx.navigateTo({
      url: '/pages/SelectHouse/index',
    });
  }

  toggleNavigateShow() {
    this.setState({
      isNavigateBarHidden: !this.state.isNavigateBarHidden,
    });
  }

  render() {
    const { navigationHeight, projectMsg } = this.state;
    const {
      billList,
      totalCharge,
    } = this.props.confirmBill;
    console.log(navigationHeight, 'navigationHeight', `${navigationHeight}rpx`)

    const isTotalChargeZero = !this.totalCharge || this.totalCharge === '0.00';

    return (
      <View class="confirm-bill">
        <NavigationBar styles={{ backgroundColor: COLOR_GREY }} />
        <View class="confirm-bill-title" style={{ paddingTop: `${navigationHeight}rpx` }}>
          <HeaderTitle
            title="账单代缴"
            subTitle={projectMsg}
            styles={{ color: '#fff', backgroundColor: COLOR_GREY }}
          >
            <View class="other-house" onClick={this.onToOtherHouseTap}>
              <Text>其他房屋账单</Text>
              <Image src={ICON_YELLOW_RIGHT} />
            </View>
          </HeaderTitle>
        </View>
        {
          billList && billList.length ? (
            <View class="bill-list-wrapper" style={{ paddingTop: `${navigationHeight}rpx` }}>
              {/* {
                billList.map((v, i) => <BillYearList data={v} key={i} toggleCheckBoxShow={toggleCheckBoxShow} currentParentIndex={i} />)
              } */}
            </View>
          ) : (
            <View class="empty" style={{ paddingTop: `${navigationHeight + 180}rpx` }}>
              <EmptyPage
                title="该房屋查询不到账单"
              />
            </View>
          )
        }
        {
          !isTotalChargeZero && billList && billList.length && (
            <View class="confirm-bill-bottom">
              <View class="bill-total">
                实付金额：<Text class="bill">¥{totalCharge}</Text>
              </View>
              <Navigator target="miniProgram" openType="navigate" appId="wxe0f6c61fa1c120d5" path="" extraData="{{extraData}}" version="trial">
                <CustomButton
                  title="立即缴费"
                  styles={{ width: '288rpx', height: '96rpx' }}
                />
              </Navigator>
            </View>
          )
        }
        {
          isTotalChargeZero && billList && billList.length && (
            <View class="confirm-bill-bottom unactive">
              <View class="bill-total">
                请先选择缴费账单
              </View>
              <CustomButton
                title="立即缴费"
                styles={{ width: '288rpx', height: '96rpx' }}
              />
            </View>
          )
        }
      </View>
    );
  }
}

confirmBill.propTypes = propTypes;
confirmBill.defaultProps = defaultProps;

export default confirmBill;
