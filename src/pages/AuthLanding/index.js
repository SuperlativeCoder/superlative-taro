import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as AuthLandingActions from '../../actions/authLanding';
import NavigationBar from '../../components/NavigationBar';
import IMG_INTRO from '../../public/images/miniapp_bill_intro.svg';

import './index.scss';


@connect(({ counter }) => ({
  counter,
}), combineActions({
  ...AuthLandingActions,
}))
class AuthLanding extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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
              <Button class="button" onGetuserinfo="bindGetUserInfo" open-type="getUserInfo">
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
