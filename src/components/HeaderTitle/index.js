import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  styles: PropTypes.shape({}),
  children: PropTypes.func,
};

const defaultProps = {
  title: '',
  subTitle: '',
  styles: {},
  children: () => {},
};

class HeaderTitle extends Component {
  render() {
    const { title, subTitle, styles } = this.props;

    return (
      <View className="header-title" style={styles}>
        <View className="header-title-base">{title}</View>
        <View className="header-title-sub">{subTitle}</View>
        { this.props.children }
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
