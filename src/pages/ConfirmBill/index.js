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

const COLOR_GREY = 'rgb(178,149,116)';

const propTypes = {
  getUserBillData: PropTypes.func,
  toggleCheckStatus: PropTypes.func,
  confirmBill: PropTypes.shape({
    extraData: PropTypes.shape({}),
    totalCharge: PropTypes.string,
    billList: PropTypes.array,
  }),
};

const defaultProps = {
  getUserBillData: () => {},
  toggleCheckStatus: () => {},
  confirmBill: {},
};


@connect(({ confirmBill }) => ({
  confirmBill,
}), combineActions({
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

  toggleCheckBoxShow(data) {
    const { currentParentIndex: index, currentIndex: subIndex, curChecked } = data;
    const { billList } = this.props.confirmBill;
    const isChecked = curChecked;
    const canCancelIndex = this.checkIfLastIndex(billList, isChecked);
    if (canCancelIndex[0] === index && canCancelIndex[1] === subIndex) {
      this.props.toggleCheckStatus({
        index,
        subIndex,
      });
    } else {
      wx.showToast({
        title: '仅可选择/取消连续月账单',
        icon: 'none',
      });
    }
  }

  checkIfLastIndex(data, isChecked) {
    let indexArrCached;
    if (data && data.length) {
      for (let i = 0; i < data.length; i += 1) {
        const billData = data[i].billData || [];
        for (let j = 0; j < billData.length; j += 1) {
          if (billData[j].isChecked === true && isChecked) {
            return [i, j];
          } else if (billData[j].isChecked === true && !isChecked) {
            return indexArrCached;
          } else {
            indexArrCached = [i, j];
          }
        }
      }
      return [data.length - 1, data[data.length - 1].billData.length - 1];
    }
  }

  render() {
    const { navigationHeight, projectMsg } = this.state;
    const {
      billList,
      totalCharge,
      extraData,
    } = this.props.confirmBill;
    const isTotalChargeZero = !totalCharge || totalCharge === '0.00';

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
              {
                billList.map((v, i) => <BillYearList data={v} key={i} onToggleCheckBoxShow={this.toggleCheckBoxShow} currentParentIndex={i} />)
              }
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
              <Navigator target="miniProgram" openType="navigate" appId="wxe0f6c61fa1c120d5" path="" extraData={extraData} version="trial">
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
                disabled={isTotalChargeZero}
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
