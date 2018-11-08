import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const ICON_SELECT = require('../../public/images/select.svg');
const ICON_UNSELECT = require('../../public/images/unselect.svg');

const propTypes = {
  isChecked: PropTypes.bool,
};

const defaultProps = {
  isChecked: true,
};

class CheckBox extends Component {
  render() {
    const { isChecked } = this.props;

    return (
      <View class="tm-checkbox">
        {
          isChecked ? <Image className="image" src={ICON_SELECT} /> : <Image className="image" src={ICON_UNSELECT} />
        }
      </View>
    );
  }
}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
