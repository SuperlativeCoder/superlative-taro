import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import configStore from './store';

import './app.scss';

const store = configStore();

class App extends Component {
  componentDidMount() {}

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
      'pages/index/index',
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


  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
