import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import { isIOS, STATUSBAR_HEIGHT } from '../../utils/platform';
import './index.scss';

const ANDROID_NAVHAR_HEIGHT = 48;
const IOS_NAVBAR_HEIGHT = 44;
const ICON_BACK = require('../../public/images/icon-back.svg');

const propTypes = {
  isHolderBarHidden: PropTypes.bool,
  isNavigateBarHidden: PropTypes.bool,
  navigationBarTitle: PropTypes.string,
};

const defaultProps = {
  isHolderBarHidden: false,
  isNavigateBarHidden: true,
  navigationBarTitle: '',
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackButtonShow: false,
      showHomeButton: false,
      fontWeight: isIOS ? 'bold' : 'normal',
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
    const { showHomeButton, fontWeight, isBackButtonShow } = this.state;
    const { navigationBarTitle = '', isHolderBarHidden, isNavigateBarHidden } = this.props;
    console.log(navigationBarTitle, 'navigationBarTitle');

    return (
      <View className="navigation-bar-wrapper">
        <View
          className="fixed-bar"
          style={{
            height: `${NAVIGATIONBAR_HEIGHT}px`,
            paddingTop: `${STATUSBAR_HEIGHT}px`,
            transform: `translateY(-${!isNavigateBarHidden ? 0 : NAVIGATIONBAR_TOTAL_HEIGHT}px)`
          }}
        >
          <View className="navigation-left">
            {
              isBackButtonShow && <View className="back-icon" onClick={this.navigateBack}>
                <Image className="back-image" src={ICON_BACK} />
              </View>
            }
            { showHomeButton && <View className="back-text" style={{ fontWeight }}>首页</View>}
          </View>
          <View className="navigation-title">{navigationBarTitle}</View>
          <View className="navigation-right" />
        </View>
        {
          !isHolderBarHidden && <View className="holder-bar" style={{ height: `${!isNavigateBarHidden ? NAVIGATIONBAR_TOTAL_HEIGHT : 0}px` }} />
        }
      </View>
    );
  }
}

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
