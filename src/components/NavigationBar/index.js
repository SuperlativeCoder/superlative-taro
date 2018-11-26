import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import { isIOS, STATUSBAR_HEIGHT, ANDROID_NAVBAR_HEIGHT, IOS_NAVBAR_HEIGHT } from '../../constants/weapp';
import './index.scss';

const ICON_BACK = require('../../public/images/icon-back.svg');

const propTypes = {
  isShow: PropTypes.bool,
  isFixed: PropTypes.bool,
  title: PropTypes.string,
  styles: PropTypes.shape({}),
  navigateParam: PropTypes.shape({}),
};

const defaultProps = {
  isShow: true,
  isFixed: true,
  title: '',
  styles: {},
  navigateParam: {},
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: isIOS ? IOS_NAVBAR_HEIGHT * 2 : ANDROID_NAVBAR_HEIGHT * 2,
      paddingTop: STATUSBAR_HEIGHT * 2,
      showHomeButton: false,
      isBackButtonShow: false,
    };
  }

  componentWillMount() {
    const pages = getCurrentPages();
    if (pages.length === 1 && pages[0].route !== __wxConfig.pages[0]) {
      this.setState({
        showHomeButton: true,
        isBackButtonShow: true,
      });
    } else if (pages.length > 1) {
      this.setState({
        isBackButtonShow: true,
      });
    } else {
      this.setState({
        isBackButtonShow: false,
      });
    }
  }

  handleNavigate(invokeParam) {
    const that = this;
    const param = this.navigateParam ? this.navigateParam : invokeParam;

    if (param && param.navigateBackType === 2) {
      this.navigateBackHome();
    } else if (param && param.navigateBackType === 3 && param.content) {
      wx.showModal({
        title: param.title || '',
        content: param.content,
        success(res) {
          if (res.confirm) {
            that.navigateBack();
          }
        },
      });
    } else {
      this.navigateBack();
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

  render() {
    const {
      height,
      paddingTop,
      showHomeButton,
      isBackButtonShow,
    } = this.state;
    const {
      isShow,
      isFixed,
      styles,
      title,
    } = this.props;
    const totalHeight = `-${height + paddingTop}rpx`;

    return (
      <View class="navigation-bar-wrapper" style={styles}>
        <View
          class="navigation-bar"
          style={{
            paddingTop: `${paddingTop}rpx`,
            height: `${height}rpx`,
            lineHeight: `${height}rpx`,
            position: isFixed && 'fixed',
            transform: `translateY(${isShow ? '0' : totalHeight})`,
          }}
        >
          {
            isBackButtonShow && (
              <View
                class="back"
                style={{
                  paddingTop: `${paddingTop}rpx`,
                  height: `${height}rpx`,
                  lineHeight: `${height}rpx`,
                }}
                onClick={this.handleNavigate}
              >
                <View class="icon-back">
                  <image src={ICON_BACK} />
                </View>
                { showHomeButton && <View class="back-home">首页</View> }
              </View>
            )
          }
          
          <View class="title">{title}</View>
        </View>
        <View
          class="navigation-bar-holder"
          style={{
            paddingTop: `${paddingTop}rpx`,
            height: `${isFixed && isShow ? height : 0}rpx`,
            lineHeight: `${height}rpx`,
          }}
        />
      </View>
    );
  }
}

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
