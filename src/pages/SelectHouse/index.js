import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import combineActions from '../../middlewares/combineActions';
import * as authLandingActions from '../../actions/authLanding';
import * as selectHouseActions from '../../actions/selectHouse';
import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import CustomButton from '../../components/CustomButton';
import ICON_ADD_BLACK from '../../public/images/topbar_add_black@2x.png';
import LOADING_STATUS from '../../constants/loadingStatus';
import { HOUSE_DATA } from '../../constants/localStorage';
import HouseBar from './Components/HouseBar';
import './index.scss';

const propTypes = {
  getBindingHouses: PropTypes.func.isRequired,
  selectHouse: PropTypes.shape({
    houses: PropTypes.object,
  }).isRequired,
};

@connect(({ selectHouse }) => ({
  selectHouse,
}), combineActions({
  ...authLandingActions,
  ...selectHouseActions,
}))
class SelectHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onAddHouseTap = this.onAddHouseTap.bind(this);
  }
  componentDidMount() {
    if (this.loadingStatus !== LOADING_STATUS.SUCCESS) {
      wx.showLoading();
      this.props.getBindingHouses(() => {
        wx.hideLoading();
      }, (err) => {
        wx.hideLoading();
        wx.showToast({
          title: err.message || '房屋获取失败',
          icon: 'none',
        });
      });
    }
  }

  onAddHouseTap() {
    wx.navigateTo({
      url: '/pages/ChoosingProject/index',
    });
  }

  onHouseTap(i) {
    const houseData = wx.getStorageSync(HOUSE_DATA);
    const { houses } = this.props.selectHouse;
    if (houseData) {
      wx.setStorageSync(HOUSE_DATA, {
        ...wx.getStorageSync(HOUSE_DATA),
        house: houses[i],
      });
    } else {
      wx.setStorageSync(HOUSE_DATA, {
        house: houses[i],
      });
    }
    wx.navigateTo({
      url: '/pages/ConfirmBill/index',
    });
  }

  render() {
    const {
      houses,
    } = this.props.selectHouse;

    return (
      <View class="select-house">
        <NavigationBar />
        <HeaderTitle title="选择房屋账单" styles={{ backgroundColor: '#fff' }} />
        <View class="notice-bar">
          <View class="content">
            你的账户下有如下房屋账单，请选择要缴费的房屋
          </View>
        </View>
        <View class="house-list">
          {
            houses && houses.length ? houses.map((v, i) => <HouseBar data={v} key={i} onHouseTap={this.onHouseTap.bind(this, i)} />) : ''
          }
        </View>
        <View class="other-house" onClick={this.onAddHouseTap}>
          <CustomButton
            title="添加其他房屋账单"
            type="primary"
            iconPos="left"
            iconSrc={ICON_ADD_BLACK}
          />
        </View>
      </View>
    );
  }
}

SelectHouse.propTypes = propTypes;

export default SelectHouse;
