import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// import { add, minus, asyncAdd } from '../../actions/counter';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import combineActions from '../../middlewares/combineActions';
import * as choosingHouseActions from '../../actions/choosingHouse';

import './index.scss';


@connect(({ houses }) => ({
  houses,
}), combineActions({
  ...choosingHouseActions,
}))
class ChoosingHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectMsg: '',
    };
  }

  componentDidMount() {
    // const houseData = wx.getStorageSync(HOUSE_DATA)
    // const { city, project, building } = houseData;
    // if (project && building) {
    //   wx.showLoading();
    //   this.projectMsg = building.name
    //   this.methods.getHouseByBuilding(building.code, (res) => {
    //     wx.hideLoading();
    //   }, (err) => {
    //     wx.hideLoading();
    //   })
    // }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
  }

  render() {
    const {
      projectMsg,
    } = this.state;

    return (
      <View className="choosing-house">
        <View class="choosing-house">
          <NavigationBar />
          <HeaderTitle title="选择代缴房屋" subTitle={projectMsg} />
          {/* <bar-list
            :listData.sync="houses"
          ></bar-list> */}
        </View>
      </View>
    );
  }
}

export default ChoosingHouse;
