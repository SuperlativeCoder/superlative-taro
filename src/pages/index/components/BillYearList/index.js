import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  color: PropTypes.string,
};

const defaultProps = {
  title: '',
  subTitle: '',
  color: '#454545',
};

class HeaderTitle extends Component {
  render() {
    const { title, subTitle, color } = this.props;

    return (
      <View className="header-title">
        <View className="header-title-base" style={{ color }}>{title}</View>
        <View className="header-title-sub" style={{ color }}>{subTitle}</View>
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
