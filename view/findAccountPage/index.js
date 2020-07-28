import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image, Button} from 'react-native-ui-lib';

export default class FindAccount extends Component {
  render() {
    return (
      <View>
        <Text>召回密码</Text>
        <Button
            label={'进主页'}
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}
        />
      </View>
    );
  }
}
