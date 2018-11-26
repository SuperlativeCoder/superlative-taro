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

class HeaderTitle extends Component {
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
    console.log(styles, 'style');

    return (
      <View
        className={`custom-button ${type}`}
        disabled={disabled}
        style={styles}
        onClick={onClick}
      >
        {
          iconPos === 'left' && <Image className="left-arrow" src={iconSrc} />
        }
        <View className="custom-button-content">{title}</View>
        {
          iconPos === 'right' && <Image className="right-arrow" src={iconSrc} />
        }
      </View>
    );
  }
}

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
