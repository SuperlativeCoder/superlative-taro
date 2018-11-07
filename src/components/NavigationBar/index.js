import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import PropTypes from 'prop-types';

import { isIOS, statusBarHeight } from '../../utils/platform';
import './index.scss';

const ANDROID_NAVHAR_HEIGHT = 48;
const IOS_NAVBAR_HEIGHT = 44;
const ICON_BACK = require('../../public/images/icon-back.svg');

const propTypes = {
  isHolderBarHidden: PropTypes.bool,
  isNavigateBarShow: PropTypes.bool,
};

const defaultPropTypes = {
  isHolderBarHidden: false,
  isNavigateBarShow: true,
}

class NavigationBar extends Component {

  config = {
  }

  constructor(props) {
    super(props);
    this.state = {
      height: isIOS ? IOS_NAVBAR_HEIGHT : ANDROID_NAVHAR_HEIGHT,
      paddingTop: statusBarHeight,
      showHomeButton: false,
      // isNavigateBarShow: true,
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
    const { height, paddingTop, showHomeButton, fontWeight } = this.state;
    const { navigationBarTitle, isHolderBarHidden, isNavigateBarShow } = this.props;
    console.log(isNavigateBarShow, 'isNavigateBarShow')
    return (
      <View className="navigation-bar-wrapper">
        <View className="fixed-bar" style={{height: `${height}px`, paddingTop: `${paddingTop}px`, transform:`translateY(${isNavigateBarShow?'0px':-(height + paddingTop)}px)`}}>
          <View className="navigation-left" onClick={this.navigateBack}>
            <View className="back-icon">
              <Image className="back-image" src={ICON_BACK}></Image>
            </View>
            { showHomeButton && <View className="back-text">首页</View>}
          </View>
          <View className="navigation-title">主页</View>
          <View className="navigation-right"></View>
        </View>
        {
          !isHolderBarHidden && <View className="holder-bar" style={{height: `${isNavigateBarShow ? (height + paddingTop) : 0}px`}} />
        }
      </View>
    )
  }
}

NavigationBar.propTypes = propTypes;
NavigationBar.defaultPropTypes = defaultPropTypes;

export default NavigationBar
