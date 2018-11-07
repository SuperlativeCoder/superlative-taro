import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { isIOS, statusBarHeight } from '../../utils/platform.js';

const ANDROID_NAVHAR_HEIGHT = 48;
const IOS_NAVBAR_HEIGHT = 44;

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class NavigationBar extends Component {

  config = {
  }

  constructor(props) {
    super(props)
    this.state = {
      height: isIOS ? IOS_NAVBAR_HEIGHT : ANDROID_NAVHAR_HEIGHT,
      paddingTop: statusBarHeight,
      showHomeButton: false,
      isNavigateBarShow: true,
      fontWeight: isIOS ? 'bold' : 'normal',
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    console.log(arguments, wx, '11111111')
    const pages = getCurrentPages();
    if (pages.length < 2 && pages[0].route !== __wxConfig.pages[0]) {
      this.setState({
        showHomeButton: true
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { 
    console.log(arguments, wx)
  }

  componentDidHide () { }
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
    return (
      <View className='navigation-bar'>
        <View style={{height: `${height}px`, paddingTop: `${paddingTop}px`, background: '#ccc'}}>
          {
            showHomeButton ? '1111111': '1122222'
          }
        </View>
      </View>
    )
  }
}

export default NavigationBar
