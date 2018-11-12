import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  type: 'default',
  title: '',
};

class HeaderTitle extends Component {
  render() {
    const {
      title,
      type,
    } = this.props;
    return (
      <View className={`custom-button ${type}`}>
        <View className="custom-button-content">{title}</View>
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
