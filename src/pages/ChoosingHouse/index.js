import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import ListBar from '../../components/ListBar';
import combineActions from '../../middlewares/combineActions';
import * as choosingHouseActions from '../../actions/choosingHouse';
import { HOUSE_DATA } from '../../constants/localStorage';

import './index.scss';

const propTypes = {
  bindingHouseByHouseCode: PropTypes.func.isRequired,
  getHouseByBuilding: PropTypes.func.isRequired,
  choosingHouse: PropTypes.shape({
    houses: PropTypes.object,
  }).isRequired,
};

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
    wx.showLoading();
    const { building } = wx.getStorageSync(HOUSE_DATA);
    if (building) {
      this.props.getHouseByBuilding(building.code, () => {
        wx.hideLoading();
      }, (err) => {
        wx.showToast({
          title: err.message || '获取房屋信息失败',
          icon: 'none',
        });
        wx.hideLoading();
      });
    }
  }

  onHouseClick(i) {
    const {
      houses,
    } = this.props.choosingHouse;
    this.props.bindingHouseByHouseCode(houses[i].code, () => {
      wx.setStorageSync(HOUSE_DATA, {
        ...wx.getStorageSync(HOUSE_DATA),
        house: houses[i],
      });
      wx.navigateTo({
        url: '/pages/ConfirmBill/index',
      });
    }, (err) => {
      if (err && err.code === 400) {
        wx.setStorageSync(HOUSE_DATA, {
          ...wx.getStorageSync(HOUSE_DATA),
          house: houses[i],
        });
        wx.navigateTo({
          url: '/pages/ValidateHouse/index',
        });
      } else {
        wx.showToast({
          title: err.message || '绑定房屋失败',
          icon: 'none',
        });
      }
    });
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

ChoosingHouse.propTypes = propTypes;

export default ChoosingHouse;
