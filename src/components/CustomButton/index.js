import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const ICON_ARROW = require('../../public/images/arrow_right.svg');

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
      children,
      needRightArrow,
    } = this.props;
    console.log(children, 'children', this.props);
    return (
      <View className={`custom-button ${type}`}>
        <View className="custom-button-content">{title}</View>
        {
          !needRightArrow && <Image className="right-arrow" src={ICON_ARROW} />
        }
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
