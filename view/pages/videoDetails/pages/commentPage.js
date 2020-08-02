import React, {Component} from 'react';
import {View,Text} from 'react-native';

export default class commentPage extends Component {
  componentDidMount() {
    console.log("评论区加载中")
  }

  render() {
    return <View>
      <Text>评论区</Text></View>;
  }
}
