import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as choosingProjectActions from '../../actions/choosingProject';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import GreySpace from '../../components/GreySpace';
import CustomButton from '../../components/CustomButton';
import EmptyPage from '../../components/EmptyPage';
import InputItem from '../../components/InputItem';
import PopupPage from '../../components/PopupPage';
import SearchBar from '../../components/SearchBar';
import IMG_TRANGLE from '../../public/images/st_triangle_default@2x.png';
import IMG_MUTISELECT from '../../public/images/multiselect_unselected@2x.png';
import LOADING_STATUS from '../../constants/loadingStatus';

import BMap from '../../libs/bmap-wx.min';

import './index.scss';

const AUTH_TOAST = () => {
  wx.showToast({
    title: '请点击右上角 > 关于住这儿 > 右上角设置打开定位权限, 或点击搜索框搜索你的房屋. ',
    icon: 'none',
    duration: 3000,
  });
};

@connect(({
  cities,
  projects,
  currentCity,
  currentLocation,
  loadingStatus,
}) => ({
  cities,
  projects,
  currentCity,
  currentLocation,
  loadingStatus,
}), combineActions({
  ...choosingProjectActions,
}))
class AuthLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      isPopupShow: true,
      searchValue: '123',
    };

    this.togglePopupShow = this.togglePopupShow.bind(this);
    this.onSearchBarTap = this.onSearchBarTap.bind(this);
  }
  componentDidMount() {
    if (this.loadingStatus === LOADING_STATUS.SUCCESS) {
      return;
    }
    const that = this;
    console.log(this.props, 'this.props');
    const {
      getAllCities,
      changeCurrentCity,
      setCurrentLocation,
    } = this.props;

    getAllCities(() => {
      const bmap = new BMap.BMapWX({
        ak: '6mKSk4bz4k9RBCMGRUyjil3GGUqXOXy8',
      });
      bmap.regeocoding({
        fail() {
          AUTH_TOAST();
        },
        success(res) {
          const { result } = res.originalData;
          const currentCity = result.addressComponent.city;
          const { location } = result;
          let isMatched = false;
          let matchedData;
          setCurrentLocation(location);
          console.log(that.props, 'that.props', that.getProjects);
          const { cities } = that.props;
          cities && cities.forEach((v) => {
            if (v.name === currentCity) {
              isMatched = true;
              matchedData = v;
            }
          })
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

    });
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() {}

  componentDidHide() { }

  getProjects() {
    if (!this.currentLocation) {
      AUTH_TOAST();
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 15000,
    })
    wx.getLocation({
      success(res) {
        this.props.getProjectByLocation({
          longitude: this.currentLocation.lng,
          latitude: this.currentLocation.lat,
          page: 200,
          per_page: 1,
          ...this.currentCity
        }, (res) => {
          wx.hideToast()
        }, (err) => {
          wx.showToast({
            title: err.message || '请求数据失败',
          })
        })
      },
      fail(err) {
      }
    });
  }

  onClick() {
    console.log(111)
  }

  onInput(e) {
    console.log(e.detail.value, 'e');
  }

  onSearchBarInput(e) {
    console.log(e.detail.value, 'e.detail.value')
  }

  togglePopupShow() {
    this.setState({
      isPopupShow: !this.state.isPopupShow,
    });
  }

  onSearchBarTap() {
    wx.navigateTo({
      url: '/pages/SearchProject/index',
    });
  }

  render() {
    const {
      isPopupShow,
      searchValue,
    } = this.state;
    return (
      <View class="choosing-project">
        <NavigationBar
          title="123"
        />
        <HeaderTitle title="选择代缴房屋" />
        <View class="search-bar-wrapper" onClick={this.onSearchBarTap}>
          <SearchBar disable placeholder="搜索社区名称" />
        </View>
        <GreySpace title="当前城市" />
        <View class="city">
          <View class="city-name" onTap="onCityChoosing">
            <View>abc</View>
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
        <CustomButton
          onClick={this.onClick}
          styles={{ width: '200rpx', height: '200rpx' }}
          iconPos="right"
          iconSrc={IMG_TRANGLE}
        />
        <EmptyPage title="123" />
        <InputItem
          onInput={this.onInput}
          title="123"
        />
        <SearchBar
        
          value={searchValue}
          onInput={this.onSearchBarInput}
        />
        <PopupPage
          isPopupShow={isPopupShow}
          onTogglePopupShow={this.togglePopupShow}
        >
          <View>1111</View>
        </PopupPage>
        {/* <grey-space2
          title="全部社区"
        ></grey-space2>
        <bar-list-project
          :listData.sync="projects"
        ></bar-list-project>
        <popup-page
          title="城市"
        >
          <bar-list-city
            :listData.sync="cities"
          ></bar-list-city>
        </popup-page>
      </View> */}
      </View>
    );
  }
}

export default AuthLanding;
