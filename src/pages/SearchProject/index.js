import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import NavigationBar from '../../components/NavigationBar';
import EmptyPage from '../../components/EmptyPage';
import SearchBar from '../../components/SearchBar';
import ListBar from '../../components/ListBar';
import combineActions from '../../middlewares/combineActions';
import * as searchProjectActions from '../../actions/searchProject';
import { HOUSE_DATA } from '../../constants/localStorage';
import ICON_DELETE from '../../public/images/close_dialogbox@2x.png';
import ICON_SUCCESS from '../../public/images/result_success@2x.png';

import './index.scss';

const propTypes = {
  // bindingHouseByHouseCode: PropTypes.func.isRequired,
  // getHouseByBuilding: PropTypes.func.isRequired,
  searchProject: PropTypes.shape({
    houses: PropTypes.object,
  }).isRequired,
};

@connect(({ searchProject }) => ({
  searchProject,
}), combineActions({
  ...searchProjectActions,
}))
class SearchProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      status: 'default',
    };

    this.onDeleteTap = this.onDeleteTap.bind(this);
  }

  componentDidMount() {
    
  }

  onDeleteTap() {
    this.setState({
      inputValue: '',
    });
  }

  onCancelTap() {
    wx.navigateBack();
  }

  render() {
    const {
      inputValue,
      status,
    } = this.state;
    const {
      houses,
    } = this.props.searchProject;

    return (
      <View class="search-project">
        <NavigationBar />
        <View class="search-bar-out-wrapper">
          <SearchBar />
          {
            inputValue ? (
              <View class="delete" onClick={this.onDeleteTap}>
                <Image src={ICON_DELETE} />
              </View>
            ) : ''
          }
          <View class="cancel" onClick={this.onCancelTap}>取消</View>
        </View>
        <View class="search-content">
          {
            status === 'loading' && (
              <View class="loading">
                <Image src={ICON_SUCCESS} />
              </View>
            )
          }
          {
            status === 'empty' && (
              <EmptyPage />
            )
          }
          {
            status === 'success' && (
              <ListBar name="111" />
            )
          }
        </View>
      </View>
    );
  }
}

SearchProject.propTypes = propTypes;

export default SearchProject;
