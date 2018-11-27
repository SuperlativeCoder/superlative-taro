import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as authLandingActions from '../../actions/authLanding';
import * as selectHouseActions from '../../actions/selectHouse';
// import NavigationBar from '../../components/NavigationBar';
import IMG_INTRO from '../../public/images/miniapp_bill_intro.svg';

import './index.scss';


@connect(({ counter }) => ({
  counter,
}), combineActions({
  ...authLandingActions,
  ...selectHouseActions,
}))
class AuthLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.onGetUserInfo = this.onGetUserInfo.bind(this);
  }
  componentDidMount() {
    const that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.props.getUserDataByCode(res.code, (resSuccess) => {
            if (resSuccess.ticket) {
              wx.setStorageSync('token', resSuccess)
            }
          });
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onGetUserInfo(res) {
    console.log(arguments, 'arguments', this.props);
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

export default AuthLanding;
