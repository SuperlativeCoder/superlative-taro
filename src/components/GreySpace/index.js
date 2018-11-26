import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const ICON_SELECT = require('../../public/images/select.svg');
const ICON_UNSELECT = require('../../public/images/unselect.svg');

const propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  title: '',
  type: '',
  style: {},
};

class CheckBox extends Component {
  render() {
    const { title, type, style } = this.props;

    return (
      <View class={`grey-space ${type}`} style={style}>
        <View class="content">
          {title}
        </View>
      </View>
    );
  }
}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
