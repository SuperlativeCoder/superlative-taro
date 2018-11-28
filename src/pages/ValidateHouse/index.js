import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import GreySpace from '../../components/GreySpace';
import InputItem from '../../components/InputItem';
import CustomButton from '../../components/CustomButton';
import combineActions from '../../middlewares/combineActions';
import * as validateHouseActions from '../../actions/validateHouse';
import { HOUSE_DATA } from '../../constants/localStorage';
import ICON_INTRO from '../../public/images/miniapp_bill_intro.svg';

import './index.scss';

const propTypes = {
  getBuildingByProject: PropTypes.func.isRequired,
  validateHouse: PropTypes.shape({
    buildings: PropTypes.array.isRequired,
  }).isRequired,
};

@connect(({ validateHouse }) => ({
  validateHouse,
}), combineActions({
  ...validateHouseActions,
}))
class ValidateHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectMsg: '',
    };
  }

  componentDidMount() {
    const { project } = wx.getStorageSync(HOUSE_DATA);
    this.props.getBuildingByProject(project.code, () => {
      wx.hideLoading();
    }, (err) => {
      wx.showToast({
        title: err.message || '获取房屋信息失败',
        icon: 'none',
      });
      wx.hideLoading();
    });
  }

  onBuildingClick(i) {
    const { buildings } = this.props.validateHouse;
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
    } = this.props.validateHouse;
    return (
      <View class="validate-house">
        <NavigationBar />
        <HeaderTitle
          title="选择代缴房屋"
          subTitle="projectMsg"
        />
        <GreySpace
          type="middle"
          title="你的微信号已累计查询超过3个房屋，继续查询需输入该房屋对应的房屋编码。"
        />
        <InputItem title="输入房屋编码" type="idcard" />
        <View class="button-wrapper" onClick={this.onValidateHouse}>
          <CustomButton content="添加" />
        </View>
        <View class="warnings">
          <View class="title">我的房屋编码在哪里？</View>
          <View class="content">
            <View class="list">1.  登录“住这儿”APP</View>
            <View class="list">2.  确定自己绑定了要添加房屋</View>
            <View class="list">3.  点击“我-我的房屋”</View>
            <View class="list">4.  找到房屋编码</View>
          </View>
          <Image class="image" src={ICON_INTRO} />
        </View>
      </View>
    );
  }
}

ValidateHouse.propTypes = propTypes;

export default ValidateHouse;
