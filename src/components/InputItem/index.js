import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  title: PropTypes.string,
  styles: PropTypes.shape({}),
  type: PropTypes.oneOf([
    'text',
    'number',
    'idcard',
    'digit',
  ]),
  value: PropTypes.string,
  maxlength: PropTypes.number,
  onInput: PropTypes.func,
};

const defaultProps = {
  title: '',
  value: '',
  type: 'text',
  styles: {},
  maxlength: 30,
  onInput: () => {},
};

class InputItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputFocus: false,
      isPasswordShow: true,
    };
  }

  render() {
    const { isInputFocus, isPasswordShow } = this.state;
    const {
      title,
      styles,
      type,
      value,
      maxlength,
      onInput,
    } = this.props;

    return (
      <View class="input-item" style={styles}>
        <View class="input-wrapper">
          <View class="input-item-label" onClick="onCoverViewTap">{title}</View>
          <Input
            class="input"
            focus={isInputFocus}
            password={!isPasswordShow}
            onInput={onInput}
            type={type}
            value={value}
            maxlength={maxlength}
          />
        </View>
      </View>
    );
  }
}

InputItem.propTypes = propTypes;
InputItem.defaultProps = defaultProps;

export default InputItem;
