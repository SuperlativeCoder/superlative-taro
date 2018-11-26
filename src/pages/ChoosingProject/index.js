import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import combineActions from '../../middlewares/combineActions';
import * as AuthLandingActions from '../../actions/authLanding';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import GreySpace from '../../components/GreySpace';
import IMG_TRANGLE from '../../public/images/st_triangle_default@2x.png';
import IMG_MUTISELECT from '../../public/images/multiselect_unselected@2x.png';

import './index.scss';


@connect(({ counter }) => ({
  counter,
}), combineActions({
  ...AuthLandingActions,
}))
class AuthLanding extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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
