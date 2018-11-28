import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
import * as choosingProjectActions from '../../actions/choosingProject';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import GreySpace from '../../components/GreySpace';
import PopupPage from '../../components/PopupPage';
import SearchBar from '../../components/SearchBar';
import ListBar from '../../components/ListBar';
import IMG_TRANGLE from '../../public/images/st_triangle_default@2x.png';
import IMG_MUTISELECT from '../../public/images/multiselect_unselected@2x.png';
import LOADING_STATUS from '../../constants/loadingStatus';
import { HOUSE_DATA } from '../../constants/localStorage';

import BMap from '../../libs/bmap-wx.min';

import './index.scss';

const AUTH_TOAST = () => {
  wx.showToast({
    title: '请点击右上角 > 关于住这儿 > 右上角设置打开定位权限, 或点击搜索框搜索你的房屋. ',
    icon: 'none',
    duration: 3000,
  });
};

const propTypes = {
  getAllCities: PropTypes.func.isRequired,
  changeCurrentCity: PropTypes.func.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  choosingProject: PropTypes.shape({
    currentCity: PropTypes.object,
    currentLocation: PropTypes.object,
    projects: PropTypes.array,
    cities: PropTypes.array,
  }).isRequired,
};

@connect(({
  choosingProject,
}) => ({
  choosingProject,
}), combineActions({
  ...choosingProjectActions,
}))
class ChoosingProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopupShow: false,
    };

    this.togglePopupShow = this.togglePopupShow.bind(this);
    this.onSearchBarTap = this.onSearchBarTap.bind(this);
    this.onCityChoosing = this.onCityChoosing.bind(this);
  }
  componentDidMount() {
    if (this.loadingStatus === LOADING_STATUS.SUCCESS) {
      return;
    }
    const that = this;
    const {
      getAllCities,
      changeCurrentCity,
      setCurrentLocation,
    } = this.props;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 15000,
    });
    getAllCities(() => {
      const bmap = new BMap.BMapWX({
        ak: '6mKSk4bz4k9RBCMGRUyjil3GGUqXOXy8',
      });
      bmap.regeocoding({
        fail() {
          AUTH_TOAST();
        },
        success(res) {
          wx.hideToast();
          const { result } = res.originalData;
          const currentCity = result.addressComponent.city;
          const { location } = result;
          let isMatched = false;
          let matchedData;
          setCurrentLocation(location);
          const { cities } = that.props.choosingProject;
          if (cities && cities.length) {
            cities.forEach((v) => {
              if (v.name === currentCity) {
                isMatched = true;
                matchedData = v;
              }
            });
          }
          if (isMatched) {
            changeCurrentCity(matchedData);
          } else {
            wx.showToast({
              title: '当前城市无社区, 请手动选择',
              icon: 'none',
            });
            changeCurrentCity({
              name: '深圳市',
              code: '440300',
            });
          }
          that.getProjects();
        },
      });
    }, (err) => {
      wx.showToast({
        title: err.message || '获取城市信息错误',
        icon: 'none',
      });
    });
  }

  onCityChoosing() {
    this.setState({
      isPopupShow: true,
    });
  }

  onSearchBarTap() {
    wx.navigateTo({
      url: '/pages/SearchProject/index',
    });
  }

  onCityClick(i) {
    const {
      changeCurrentCity,
      choosingProject: { cities },
    } = this.props;
    changeCurrentCity(cities[i]);
    wx.setStorageSync(HOUSE_DATA, {
      ...wx.getStorageSync(HOUSE_DATA),
      city: cities[i],
    });
    this.setState({
      isPopupShow: false,
    });
    this.onCityChoosing();
    this.getProjects();
  }

  onProjectClick(i) {
    const { projects } = this.props.choosingProject;
    wx.setStorageSync(HOUSE_DATA, {
      ...wx.getStorageSync(HOUSE_DATA),
      project: projects[i],
    });
    wx.navigateTo({
      url: '/pages/ChoosingBuilding/index',
    });
  }

  getProjects() {
    const that = this;
    const { currentLocation, currentCity } = this.props.choosingProject;
    if (!currentLocation) {
      AUTH_TOAST();
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 15000,
    });
    wx.getLocation({
      success() {
        that.props.getProjectByLocation({
          longitude: currentLocation.lng,
          latitude: currentLocation.lat,
          page: 200,
          per_page: 1,
          ...currentCity,
        }, () => {
          wx.hideToast();
        }, (err) => {
          wx.showToast({
            title: err.message || '请求项目数据失败',
            icon: 'none',
          });
        });
      },
      fail(err) {
        wx.showToast({
          title: err.message || '定位失败',
          icon: 'none',
        });
      },
    });
  }

  togglePopupShow() {
    this.setState({
      isPopupShow: !this.state.isPopupShow,
    });
  }

  render() {
    const {
      isPopupShow,
    } = this.state;
    const {
      cities,
      projects,
      currentCity,
    } = this.props.choosingProject;

    return (
      <View class="choosing-project">
        <NavigationBar />
        <HeaderTitle title="选择代缴房屋" />
        <View class="search-bar-wrapper" onClick={this.onSearchBarTap}>
          <SearchBar disable placeholder="搜索社区名称" />
        </View>
        <GreySpace title="当前城市" />
        <View class="city">
          <View class="city-name" onClick={this.onCityChoosing}>
            <View>{currentCity.name}</View>
            <Image src={IMG_TRANGLE} />
          </View>
          <View class="location-status">
            <View class="relocation" onTap="onRelocationTap">
              <Image src={IMG_MUTISELECT} />
              <View>重新定位</View>
            </View>
          </View>
        </View>
        <GreySpace title="全部社区" />
        {
          projects && projects.length ? projects.map((v, i) => <ListBar key={i} name={v.name} onClick={this.onProjectClick.bind(this, i)} />) : ''
        }
        <PopupPage
          isPopupShow={isPopupShow}
          title="城市"
          onTogglePopupShow={this.togglePopupShow}
        >
          {
            cities && cities.length ? cities.map((v, i) => <ListBar key={i} name={v.name} onClick={this.onCityClick.bind(this, i)} />) : ''
          }
        </PopupPage>
      </View>
    );
  }
}

ChoosingProject.propTypes = propTypes;

export default ChoosingProject;
