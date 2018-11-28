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
  checkHouseCode: PropTypes.func.isRequired,
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
      inputValue: '',
    };

    this.onInput = this.onInput.bind(this);
  }

  componentWillMount() {
    const houseData = wx.getStorageSync(HOUSE_DATA);
    const { house } = houseData;
    if (house) {
      this.setState({
        projectMsg: house.name,
      });
    }
  }

  onValidateHouse() {
    const houseCode = wx.getStorageSync(HOUSE_DATA).house.code;
    const { inputValue } = this.state;
    this.props.checkHouseCode(inputValue, houseCode, () => {
      wx.navigateTo({
        url: '/pages/ConfirmBill/index',
      });
    }, (err) => {
      wx.showToast({
        title: err.data || '房屋编码错误',
        icon: 'none',
      });
    });
  }

  onInput(e) {
    const inputValue = e.detail.value;
    this.setState({
      inputValue,
    });
  }

  render() {
    const {
      projectMsg,
      inputValue,
    } = this.state;

    return (
      <View class="validate-house">
        <NavigationBar />
        <HeaderTitle
          title="选择代缴房屋"
          subTitle={projectMsg}
          styles={{ backgroundColor: '#fff' }}
        />
        <GreySpace
          type="middle"
          title="你的微信号已累计查询超过3个房屋，继续查询需输入该房屋对应的房屋编码。"
        />
        <InputItem value={inputValue} onInput={this.onInput} title="输入房屋编码" type="idcard" />
        <View class="button-wrapper">
          <CustomButton title="添加" onClick={this.onValidateHouse} />
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
