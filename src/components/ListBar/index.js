import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import ICON_GREY_RIGHT from '../../public/images/arrow_grey_right.svg';
import './index.scss';

const propTypes = {
  name: PropTypes.string,
  onListBarTap: PropTypes.func,
  isRightArrowShow: PropTypes.bool,
  children: PropTypes.func,
};

const defaultProps = {
  name: '',
  onListBarTap: () => {},
  isRightArrowShow: true,
  children: () => {},
};

class ListBar extends Component {
  render() {
    const {
      name,
      onListBarTap,
      isRightArrowShow,
    } = this.props;

    return (
      <View class="list-bar-wrapper" onClick={onListBarTap}>
        <View class="list-bar">
          <View class="content">
            <View class="text">{name}</View>
            { this.props.children }
          </View>
          <View class="image">
            {
              isRightArrowShow && <Image src={ICON_GREY_RIGHT} />
            }
          </View>
        </View>
      </View>
    );
  }
}

ListBar.propTypes = propTypes;
ListBar.defaultProps = defaultProps;

export default ListBar;
