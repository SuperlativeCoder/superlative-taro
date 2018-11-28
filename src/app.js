import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider, connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import Index from './pages/ConfirmBill';
import * as selectHouseActions from './actions/selectHouse';
import * as authLandingActions from './actions/authLanding';
import combineActions from './middlewares/combineActions';

import configStore from './store';

import './app.scss';

const store = configStore();

const propTypes = {
  getBindingHouses: PropTypes.func.isRequired,
  getUserDataByCode: PropTypes.func.isRequired,
};

@connect(({ authLanding }) => ({
  authLanding,
}), combineActions({
  ...authLandingActions,
  ...selectHouseActions,
}))
class App extends Component {
  async componentWillMount() {
    const token = wx.getStorageSync('token');
    if (!token.ticket) {
      wx.reLaunch({
        url: '/pages/AuthLanding/index',
      });
    } else {
      await new Promise((resolve, reject) => {
        this.props.getBindingHouses((res) => {
          resolve(res);
        }, (err) => {
          if (err.code === 400) {
            const that = this;
            wx.login({
              success(res) {
                if (res.code) {
                  that.props.getUserDataByCode(res.code, (resSuccess) => {
                    if (resSuccess.ticket) {
                      wx.setStorageSync('token', resSuccess);
                      resolve(res);
                    }
                  });
                }
              },
            });
          } else {
            reject();
          }
        });
      });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  config = {
    pages: [
      'pages/ConfirmBill/index',
      'pages/AuthLanding/index',
      'pages/ChoosingHouse/index',
      'pages/ChoosingBuilding/index',
      'pages/ChoosingProject/index',
      'pages/SelectHouse/index',
      'pages/SearchProject/index',
      'pages/ValidateHouse/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    // 网络超时时间最大15s
    networkTimeout: {
      request: 15000,
    },
    navigateToMiniProgramAppIdList: [
      'wx71ca0b0d2d6fdab6',
      'wxe0f6c61fa1c120d5',
    ],
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

App.propTypes = propTypes;

Taro.render(<App />, document.getElementById('app'));
