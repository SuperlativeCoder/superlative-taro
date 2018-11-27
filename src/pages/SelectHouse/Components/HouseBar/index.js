import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';
import ICON_GREY_RIGHT from '../../../../public/images/arrow_grey_right.svg';

const propTypes = {
  styles: PropTypes.shape({}),
  data: PropTypes.shape({}),
  onHouseTap: PropTypes.func,
};

const defaultProps = {
  data: {},
  styles: {},
  onHouseTap: () => {},
};

class HouseBar extends Component {
  render() {
    const {
      data,
      styles,
      onHouseTap,
    } = this.props;

    return (
      <View class="house-bar" onClick={onHouseTap} style={{ borderBottom: '1rpx solid #eaeaea', ...styles }}>
        <View class="bar-left">
          <View class="project">{data.project_name}</View>
          <View class="house">{data.subName}</View>
        </View>
        <View class="bar-right">
          <image src={ICON_GREY_RIGHT} />
        </View>
      </View>
    );
  }
}

HouseBar.propTypes = propTypes;
HouseBar.defaultProps = defaultProps;

export default HouseBar;
