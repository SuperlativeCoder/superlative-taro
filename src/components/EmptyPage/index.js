import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf([
    'default',
    'bill',
    'dialogue',
    'vistor',
    'car',
    'housekeeper',
    'noservice',
    'nointernet',
    'house',
  ]),
  styles: PropTypes.shape({}),
};

const defaultProps = {
  title: '',
  type: 'default',
  styles: {},
};

class EmptyPage extends Component {
  render() {
    const { title, type, styles } = this.props;

    return (
      <View class="empty-page" style={styles}>
        <View class={`image ${type}`} />
        <View class="text">{title}</View>
      </View>
    );
  }
}

EmptyPage.propTypes = propTypes;
EmptyPage.defaultProps = defaultProps;

export default EmptyPage;
