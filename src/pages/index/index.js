import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '../../actions/counter';
import NavigationBar from '../../components/NavigationBar';

import './index.scss';


@connect(({ counter }) => ({
  counter,
}), dispatch => ({
  add() {
    dispatch(add());
  },
  dec() {
    dispatch(minus());
  },
  asyncAdd() {
    dispatch(asyncAdd());
  },
}))
class Index extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '首页1111',
    window: {
      navigationStyle: 'custom',
    },
  }

  render() {
    return (
      <View className="index">
        <NavigationBar isNavigateBarHidden={false} navigationBarTitle="biaoti" />
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Index;
