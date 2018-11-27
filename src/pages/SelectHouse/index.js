import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as authLandingActions from '../../actions/authLanding';
import * as selectHouseActions from '../../actions/selectHouse';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import CustomButton from '../../components/CustomButton';
import ICON_ADD_BLACK from '../../public/images/topbar_add_black@2x.png';
import LOADING_STATUS from '../../constants/loadingStatus';
import HouseBar from './Components/HouseBar';
import './index.scss';


@connect(({ selectHouse }) => ({
  selectHouse,
}), combineActions({
  ...authLandingActions,
  ...selectHouseActions,
}))
class AuthLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.onAddHouseTap = this.onAddHouseTap.bind(this);
  }
  componentDidMount() {
    if (this.loadingStatus !== LOADING_STATUS.SUCCESS) {
      wx.showLoading();
      this.props.getBindingHouses((res) => {
        wx.hideLoading();
      }, (err) => {
        wx.hideLoading();
        wx.showToast({
          title: err.message || '房屋获取失败'
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onAddHouseTap() {
    wx.navigateTo({
      url: '/pages/ChoosingProject/index'
    })
  }

  render() {
    const {
      houses,
      loadingStatus,
    } = this.props.selectHouse;
    console.log(houses, 'houses');
    return (
      <View class="select-house">
        <NavigationBar />
        <HeaderTitle title="选择房屋账单" />
        <View class="notice-bar">
          <View class="content">
            你的账户下有如下房屋账单，请选择要缴费的房屋
          </View>
        </View>
        <View class="house-list">
          {/* <house-bar
            :houseData.sync="houses"
          /> */}
          {
            houses && houses.length ? houses.map((v) => {
              return (
                <HouseBar data={v} />
              );
            }) : ""
          }
        </View>
        <View class="other-house" onClick={this.onAddHouseTap}>
          <CustomButton
            title="添加其他房屋账单"
            type="primary"
            iconPos="left"
            iconSrc={ICON_ADD_BLACK}
          />
        </View>
      </View>
    );
  }
}

export default AuthLanding;
