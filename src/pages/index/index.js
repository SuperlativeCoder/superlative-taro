import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';

import { add, minus, asyncAdd } from '../../actions/counter';
import NavigationBar from '../../components/NavigationBar';
import './index.scss';

const propTypes = {
  add: PropTypes.func,
  dec: PropTypes.func,
  asyncAdd: PropTypes.func,
  counter: PropTypes.shape({
    num: PropTypes.number,
  }),
};

const defaultProps = {
  add: () => {},
  dec: () => {},
  asyncAdd: () => {},
  counter: {},
};


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
  constructor(props) {
    super(props);

    this.state = {
      isNavigateBarHidden: false,
    };
  }

  componentDidMount() {
    console.log(111);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  config = {
    navigationBarTitleText: '首页1111',
    window: {
      navigationStyle: 'custom',
    },
  }

  // componentDidShow() { console.log(2); }

  // componentDidHide() { }

  toIndexOne() {
    wx.navigateTo({
      url: '/pages/index1/index',
    });
  }

  toggleNavigateShow() {
    this.setState({
      isNavigateBarHidden: !this.state.isNavigateBarHidden,
    });
  }

  render() {
    const { isNavigateBarHidden } = this.state;

    return (
      <View className="index">
        <NavigationBar isNavigateBarHidden={isNavigateBarHidden} navigationBarTitle="biaoti标题" />
        <Button className="add_btn" onClick={this.props.add}>+</Button>
        <Button className="dec_btn" onClick={this.props.dec}>-</Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>async</Button>
        <Button className="dec_btn" onClick={this.toIndexOne}>to index1</Button>
        <Button onClick={this.toggleNavigateShow.bind(this)}>toggle navigate show</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
