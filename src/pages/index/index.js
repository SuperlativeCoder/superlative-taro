import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import NavigationBar from '../../components/NavigationBar'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNavigateBarHidden: false,
    }
  }

  config = {
    navigationBarTitleText: '首页1111',
    window: {
      navigationStyle: 'custom',
    }
  }

  componentDidMount() {
    console.log(111)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { console.log(2)}

  componentDidHide () { }

  toIndex1() {
    wx.navigateTo({
      url: '/pages/index1/index'
    })
  }

  toggleNavigateShow() {
    this.setState({
      isNavigateBarHidden: !this.state.isNavigateBarHidden
    })
  }

  render () {
    return (
      <View className='index'>
        <NavigationBar isNavigateBarShow={isNavigateBarHidden}/>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <Button className='dec_btn' onClick={this.toIndex1}>to index1</Button>
        <Button onClick={this.toggleNavigateShow.bind(this)}>toggle navigate show</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
