import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import { isIOS, statusBarHeight } from '../../utils/platform';
import './index.scss';

const ANDROID_NAVHAR_HEIGHT = 48;
const IOS_NAVBAR_HEIGHT = 44;
const ICON_BACK = require('../../public/images/icon-back.svg');


class NavigationBar extends Component {

  config = {
  }

  constructor(props) {
    super(props);
    this.state = {
      height: isIOS ? IOS_NAVBAR_HEIGHT : ANDROID_NAVHAR_HEIGHT,
      paddingTop: statusBarHeight,
      showHomeButton: false,
      isNavigateBarShow: true,
      fontWeight: isIOS ? 'bold' : 'normal',
    };
  }

  componentWillMount() {
    console.log(arguments, wx, '11111111')
    const pages = getCurrentPages();
    if (pages.length < 2 && pages[0].route !== __wxConfig.pages[0]) {
      this.setState({
        showHomeButton: true,
      });
    }
  }
  
  handleNavigate(invokeParam) {
    const that = this;
    const param = this.navigateParam ? this.navigateParam : invokeParam;

    if (param && param.navigateBackType === 2) {
      this.methods.navigateBackHome();
    } else if (param && param.navigateBackType === 3 && param.content) {
      wx.showModal({
        title: param.title || '',
        content: param.content,
        success(res) {
          if (res.confirm) {
            that.methods.navigateBack();
          }
        },
      });
    } else {
      this.methods.navigateBack();
    }
  }
  navigateBack() {
    const pages = getCurrentPages();
    if (pages.length < 2 && pages[0].route !== __wxConfig.pages[0]) {
      wx.reLaunch({
        url: `/${__wxConfig.pages[0]}`,
      });
    } else {
      wx.navigateBack();
    }
  }
  navigateBackHome() {
    wx.reLaunch({
      url: `/${__wxConfig.pages[0]}`,
    });
  }
  toggleNavigateShow() {
    this.isNavigateBarShow = !this.isNavigateBarShow;
  }

  render () {
    const { height, paddingTop, showHomeButton, isNavigateBarShow, fontWeight } = this.state;
    const { navigationBarTitle } = this.props;
    return (
      <View className="navigation-bar-wrapper">
        <View className="fixed-bar" style={{height: `${height}px`, paddingTop: `${paddingTop}px`, background: '#ccc'}}>
          <View className="navigation-left">
            <View className="back-icon">
              <Image className="back-image" src={ICON_BACK}></Image>
            </View>
            <View className="back-text">首页</View>
          </View>
          <View className="navigation-title">主页</View>
          <View className="navigation-right"></View>
        </View>
        <View className="holder-bar" style={{height: `${height + paddingTop}px`}} />
      </View>
    )
  }
}

export default NavigationBar
