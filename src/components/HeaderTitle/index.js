import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  title: '',
  subTitle: '',
  style: {},
};

class HeaderTitle extends Component {
  render() {
    const { title, subTitle, style } = this.props;

    return (
      <View className="header-title" style={style}>
        <View className="header-title-base">{title}</View>
        <View className="header-title-sub">{subTitle}</View>
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
