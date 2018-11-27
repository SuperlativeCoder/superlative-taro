import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.scss';
import ICON_SEARCH from '../../public/images/topbar_search@2x.png';

const propTypes = {
  disable: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  styles: PropTypes.shape({}),
  onInput: PropTypes.func,
};

const defaultProps = {
  disable: false,
  value: '',
  placeholder: '',
  styles: {},
  onInput: () => {},
};

class SearchBar extends Component {
  render() {
    const {
      styles,
      disable,
      value,
      placeholder,
      onInput,
    } = this.props;

    return (
      <View class="search-bar-wrapper">
        <View class="search-bar" style={styles}>
          <View class="search-icon">
            <Image class="image" src={ICON_SEARCH} />
          </View>
          <View class="search-input">
            {
              disable ? <View class="static">{placeholder}</View> : <Input class="input" value={value} placeholder={placeholder} onInput={onInput} />
            }
          </View>
        </View>
      </View>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
