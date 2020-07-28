import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image, Button} from 'react-native-ui-lib';

export default class Signin extends Component {
  render() {
    return (
      <View>
        <Text>注册</Text>
        <Button
            label={'进找回页'}
            onPress={() => {
                console.log(this)
              this.props.navigation.navigate('FindAccount');
            }}
        />
      </View>
    );
  }
}
