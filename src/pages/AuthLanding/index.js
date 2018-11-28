import Taro, { Component } from '@tarojs/taro';
import { View, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
import * as authLandingActions from '../../actions/authLanding';
import * as selectHouseActions from '../../actions/selectHouse';
import IMG_INTRO from '../../public/images/miniapp_bill_intro.svg';

import './index.scss';

const propTypes = {
  getBindingHouses: PropTypes.func.isRequired,
};

@connect(({ authLanding }) => ({
  authLanding,
}), combineActions({
  ...authLandingActions,
  ...selectHouseActions,
}))
class AuthLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onGetUserInfo = this.onGetUserInfo.bind(this);
  }
  componentDidMount() {
    const that = this;
    wx.showLoading();
    wx.login({
      success(res) {
        if (res.code) {
          that.props.getUserDataByCode(res.code, (resSuccess) => {
            if (resSuccess.ticket) {
              wx.setStorageSync('token', resSuccess);
            } else {
              wx.showToast({
                title: 'param err',
                icon: 'none',
              });
            }
            wx.hideLoading();
          }, (err) => {
            wx.showToast({
              title: err.message || '登陆失败',
              icon: 'none',
            });
            wx.hideLoading();
          });
        }
      },
    });
  }

  onGetUserInfo(res) {
    if (res.detail && res.detail.userInfo) {
      this.props.getBindingHouses((resp) => {
        if (resp.houses && resp.houses.length) {
          wx.navigateTo({
            url: '/pages/SelectHouse/index',
          });
        } else {
          wx.navigateTo({
            url: '/pages/ChoosingProject/index',
          });
        }
      }, () => {
        wx.navigateTo({
          url: '/pages/ChoosingProject/index',
        });
      });
    } else {
      wx.showToast({
        title: '你需要接受授权, 才可以继续操作',
        icon: 'none',
      });
    }
  }

  render() {
    return (
      <View className="index">
        <View class="auth-landing">
          <View class="banner">
            <Image src={IMG_INTRO} />
            <View class="content">登录后，可快速缴纳物业费登录后，可快速缴纳物业费登录后，可快速缴纳物业费登录后，可快速缴纳物业费</View>
          </View>
          <View class="auth-dashboard">
            <View class="button-wrapper">
              <Button class="button" onGetUserInfo={this.onGetUserInfo} openType="getUserInfo">
                选择房屋账单
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

AuthLanding.propTypes = propTypes;

export default AuthLanding;
