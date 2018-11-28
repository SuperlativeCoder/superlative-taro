import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// import { add, minus, asyncAdd } from '../../actions/counter';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import ListBar from '../../components/ListBar';
import combineActions from '../../middlewares/combineActions';
import * as choosingHouseActions from '../../actions/choosingHouse';
import { HOUSE_DATA } from '../../constants/localStorage';

import './index.scss';


@connect(({ choosingHouse }) => ({
  choosingHouse,
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
    const { building } = wx.getStorageSync(HOUSE_DATA)
    if (building) {
      this.props.getHouseByBuilding(building.code, (res) => {
        console.log(res, 'res')
        wx.hideLoading();
      }, (err) => {
        wx.hideLoading();
      })
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
  }

  onHouseClick(i) {
    const {
      houses,
    } = this.props.choosingHouse;
    this.props.bindingHouseByHouseCode(houses[i].code, (res) => {
      wx.setStorageSync(HOUSE_DATA, {
        ...wx.getStorageSync(HOUSE_DATA),
        house: houses[i]
      })
      wx.navigateTo({
        url: '/pages/ConfirmBill/index'
      })
    }, (err) => {
      if (err && err.code === 400) {
        wx.setStorageSync(HOUSE_DATA, {
          ...wx.getStorageSync(HOUSE_DATA),
          house: houses[i]
        })
        wx.navigateTo({
          url: '/pages/ValidateHouse/index'
        })
      }
    })
  }

  render() {
    const {
      projectMsg,
    } = this.state;
    const {
      houses,
    } = this.props.choosingHouse;

    return (
      <View className="choosing-house">
        <View class="choosing-house">
          <NavigationBar />
          <HeaderTitle title="选择代缴房屋" subTitle={projectMsg} />
          {
            houses && houses.length ? houses.map((v, i) => <ListBar name={v.name} onClick={this.onHouseClick.bind(this, i)} />) : ''
          }
        </View>
      </View>
    );
  }
}

export default ChoosingHouse;
