import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as AuthLandingActions from '../../actions/authLanding';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import GreySpace from '../../components/GreySpace';
import CustomButton from '../../components/CustomButton';
import EmptyPage from '../../components/EmptyPage';
import InputItem from '../../components/InputItem';
import IMG_TRANGLE from '../../public/images/st_triangle_default@2x.png';
import IMG_MUTISELECT from '../../public/images/multiselect_unselected@2x.png';

import './index.scss';


@connect(({ counter }) => ({
  counter,
}), combineActions({
  ...AuthLandingActions,
}))
class AuthLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() {}

  componentDidHide() { }

  onClick() {
    console.log(111)
  }

  onInput(e) {
    console.log(e.detail.value, 'e');
  }

  render() {
    return (
      <View class="choosing-project">
        <NavigationBar
          title="123"
        />
        <HeaderTitle title="选择代缴房屋" />
        <View class="search-bar-wrapper" onTap="onSearchBarTap">
          {/* <search-bar
            :isDisalbed="isSearchBarDisabled"
            placeholder="搜索社区名称"
          ></search-bar> */}
        </View>
        {/* <grey-space1
          title="当前城市"
        ></grey-space1> */}
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
