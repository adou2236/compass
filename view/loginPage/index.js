import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>登录页</Text>
        <Button
          label={'进注册页'}
          onPress={() => {
            this.props.navigation.navigate('Signin');
          }}
        />
      </View>
    );
  }
}
