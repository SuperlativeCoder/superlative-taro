import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import { isIOS, STATUSBAR_HEIGHT, ANDROID_NAVBAR_HEIGHT, IOS_NAVBAR_HEIGHT } from '../../constants/weapp';
import HeaderTitle from '../HeaderTitle';
import ICON_CLOSE from '../../public/images/topbar_close_black@2x.png';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  styles: PropTypes.shape({}),
  children: PropTypes.func,
  isTitleShow: PropTypes.bool,
  isPopupShow: PropTypes.bool,
  onTogglePopupShow: PropTypes.func,
};

const defaultProps = {
  title: '',
  subTitle: '',
  styles: {},
  children: () => {},
  isTitleShow: true,
  isPopupShow: true,
  onTogglePopupShow: () => {},
};

class PopupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: isIOS ? IOS_NAVBAR_HEIGHT : ANDROID_NAVBAR_HEIGHT,
      paddingTop: STATUSBAR_HEIGHT,
      // isPopupShow: false,
    };
  }

  // onTogglePopupShow() {
  //   this.setState({
  //     isPopupShow: !this.state.isPopupShow,
  //   });
  // }

  render() {
    const { height, paddingTop } = this.state;
    const {
      title,
      subTitle,
      styles,
      isTitleShow,
      isPopupShow,
      onTogglePopupShow,
    } = this.props;

    return (
      <View
        class="popup-page"
        style={{ transform: `translateY(${isPopupShow ? 0 : 100}%)`, ...styles }}
      >
        <View
          class="header-navbar"
          style={{
            flex: `0 0 ${height}px`,
            height: `${height}px`,
            paddingTop: `${paddingTop}px`,
          }}
        >
          <View
            class="icon-cancel"
            style={{ height: `${height}px` }}
            onClick={onTogglePopupShow}
          >
            <Image src={ICON_CLOSE} />
          </View>
        </View>
        {
          isTitleShow && <HeaderTitle title={title} subTitle={subTitle} />
        }
        <View class="popup-page-content">
          { this.props.children }
        </View>
      </View>
    );
  }
}

PopupPage.propTypes = propTypes;
PopupPage.defaultProps = defaultProps;

export default PopupPage;
