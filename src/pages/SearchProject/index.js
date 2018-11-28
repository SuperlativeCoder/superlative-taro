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
  searchProjects: PropTypes.func.isRequired,
  searchProject: PropTypes.shape({
    projects: PropTypes.array,
  }).isRequired,
};
let timer;

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
    this.onSearchBarInput = this.onSearchBarInput.bind(this);
  }

  onDeleteTap() {
    this.setState({
      inputValue: '',
    });
  }

  onCancelTap() {
    wx.navigateBack();
  }

  onSearchBarInput(e) {
    const inputValue = e.detail.value;

    this.setState({
      inputValue,
    }, () => {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.projectsSearcher(inputValue);
        }, 250);
      } else {
        this.setState({
          status: 'loading',
        });
        timer = setTimeout(() => {
          this.projectsSearcher(inputValue);
        }, 250);
      }
    });
  }

  onListBarClick(i) {
    const {
      projects,
    } = this.props.searchProject;
    wx.setStorageSync(HOUSE_DATA, {
      ...wx.getStorageSync(HOUSE_DATA),
      project: projects[i],
    });
    wx.navigateTo({
      url: '/pages/ChoosingBuilding/index',
    });
  }

  projectsSearcher(inputValue) {
    this.props.searchProjects(inputValue, (res) => {
      this.setState({
        status: res.length ? 'success' : 'empty',
      });
    }, (err) => {
      wx.showToast({
        title: err.message || '请求数据错误',
        icon: 'none',
      });
    });
  }

  render() {
    const {
      inputValue,
      status,
    } = this.state;
    const {
      projects,
    } = this.props.searchProject;

    return (
      <View class="search-project">
        <NavigationBar />
        <View class="search-bar-out-wrapper">
          <View class="bar">
            <SearchBar value={inputValue} onInput={this.onSearchBarInput} />
          </View>
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
            status === 'success' && projects.map((v, i) => <ListBar name={v.name} key={i} onClick={this.onListBarClick.bind(this, i)} />)
          }
        </View>
      </View>
    );
  }
}

SearchProject.propTypes = propTypes;

export default SearchProject;
