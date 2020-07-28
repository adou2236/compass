import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native-ui-lib';

export default class videoDetails extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.id}`,
  });
  constructor(props) {
    super(props);
  }
  render() {
    console.log('接受的参数是', this.props.navigation.state.params.id);
    return (
      <View>
        <Text>视频详情</Text>
      </View>
    );
  }
}
