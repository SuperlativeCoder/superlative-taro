import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import { isIOS, STATUSBAR_HEIGHT, ANDROID_NAVHAR_HEIGHT, IOS_NAVBAR_HEIGHT } from '../../constants/weapp';
import './index.scss';

const ICON_BACK = require('../../public/images/icon-back.svg');

const propTypes = {
  isHoldBarHidden: PropTypes.bool,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  isHoldBarHidden: false,
  hidden: false,
  title: '',
  style: {},
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackButtonShow: false,
      showHomeButton: false,
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

  render() {
    const NAVIGATIONBAR_HEIGHT = isIOS ? IOS_NAVBAR_HEIGHT : ANDROID_NAVHAR_HEIGHT;
    const NAVIGATIONBAR_TOTAL_HEIGHT = NAVIGATIONBAR_HEIGHT + STATUSBAR_HEIGHT;
    const { showHomeButton, isBackButtonShow } = this.state;
    const {
      title,
      isHoldBarHidden,
      hidden,
      style,
    } = this.props;

    return (
      <View className="navigation-bar-wrapper" style={style}>
        <View
          className="fixed-bar"
          style={{
            height: `${NAVIGATIONBAR_HEIGHT}px`,
            paddingTop: `${STATUSBAR_HEIGHT}px`,
            transform: `translateY(-${!hidden ? 0 : NAVIGATIONBAR_TOTAL_HEIGHT}px)`,
          }}
        >
          <View className="navigation-left">
            {
              isBackButtonShow && <View className="back-icon" onClick={this.navigateBack}>
                <Image className="back-image" src={ICON_BACK} />
              </View>
            }
            { showHomeButton && <View className="back-text">首页</View>}
          </View>
          <View className="navigation-title" style={{ fontWeight: 'bold' }}>{title}</View>
          <View className="navigation-right" />
        </View>
        {
          !isHoldBarHidden && <View className="holder-bar" style={{ height: `${!hidden ? NAVIGATIONBAR_TOTAL_HEIGHT : 0}px` }} />
        }
      </View>
    );
  }
}

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
