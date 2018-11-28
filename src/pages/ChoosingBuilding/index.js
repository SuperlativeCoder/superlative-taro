import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// import { add, minus, asyncAdd } from '../../actions/counter';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import ListBar from '../../components/ListBar';
import combineActions from '../../middlewares/combineActions';
import * as choosingBuildingActions from '../../actions/choosingBuilding';
import { HOUSE_DATA } from '../../constants/localStorage';

import './index.scss';


@connect(({ choosingBuilding }) => ({
  choosingBuilding,
}), combineActions({
  ...choosingBuildingActions,
}))
class ChoosingBuilding extends Component {
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
    this.props.getBuildingByProject(44010008, (res) => {
      console.log(res, 'res')
      wx.hideLoading();
    }, (err) => {
      wx.hideLoading();
    })
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
  }

  onBuildingClick(i) {
    const { buildings } = this.props.choosingBuilding;
    wx.setStorageSync(HOUSE_DATA, {
      ...wx.getStorageSync(HOUSE_DATA),
      building: buildings[i],
    });
    wx.navigateTo({
      url: '/pages/ChoosingHouse/index',
    });
  }

  render() {
    const {
      projectMsg,
    } = this.state;
    const {
      buildings,
    } = this.props.choosingBuilding;
    return (
      <View className="choosing-house">
        <View class="choosing-house">
          <NavigationBar />
          <HeaderTitle title="选择代缴房屋" subTitle={projectMsg} />
          {
            buildings && buildings.length ? (
              buildings.map((v, i) => <ListBar name={v.name} onClick={this.onBuildingClick.bind(this, i)} />)
            ) : ''
          }
        </View>
      </View>
    );
  }
}

export default ChoosingBuilding;
