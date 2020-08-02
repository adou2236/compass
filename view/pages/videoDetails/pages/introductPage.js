import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class commentPage extends Component {
  componentDidMount() {
    console.log("简介加载中")
  }
  render() {
    return <View>
      <Text>简介区</Text>
    </View>;
  }
}
