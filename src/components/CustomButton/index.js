import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  iconPos: PropTypes.oneOf(['left', 'right', '']),
  iconSrc: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.shape({}),
  onClick: PropTypes.func,
};

const defaultProps = {
  type: 'default',
  title: '',
  iconPos: '',
  iconSrc: '',
  disabled: false,
  styles: {},
  onClick: () => {},
};

class CustomButton extends Component {
  render() {
    const {
      title,
      type,
      iconPos,
      iconSrc,
      disabled,
      styles,
      onClick,
    } = this.props;

    return (
      <View
        className={`custom-button ${type} ${disabled ? 'disabled' : ''}`}
        style={styles}
        onClick={onClick}
      >
        {
          iconPos === 'left' && <Image className="deco left" src={iconSrc} />
        }
        <View className="custom-button-content">{title}</View>
        {
          iconPos === 'right' && <Image className="deco right" src={iconSrc} />
        }
      </View>
    );
  }
}

CustomButton.propTypes = propTypes;
CustomButton.defaultProps = defaultProps;

export default CustomButton;
