import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import NavigationBar from '../../components/NavigationBar';
import HeaderTitle from '../../components/HeaderTitle';
import ListBar from '../../components/ListBar';
import combineActions from '../../middlewares/combineActions';
import * as choosingBuildingActions from '../../actions/choosingBuilding';
import { HOUSE_DATA } from '../../constants/localStorage';

import './index.scss';

const propTypes = {
  getBuildingByProject: PropTypes.func.isRequired,
  choosingBuilding: PropTypes.shape({
    buildings: PropTypes.array.isRequired,
  }).isRequired,
};

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
    wx.showLoading();
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

ChoosingBuilding.propTypes = propTypes;

export default ChoosingBuilding;
