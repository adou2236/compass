import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';

export default class HotVideos extends Component {
  static navigationOptions = {
    tabBarLabel: '热门',
    //简单的png图标能够与文字颜色一致
    //tabBarIcon: ({focused, horizontal, tintColor}) => {
    //             return <Image
    //                 source={require('./image/homeH.png')}
    //                 style={{width: 22, height: 22, tintColor: tintColor}}
    //             />
    //         },
    title: '热门',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return (
          <Image
            style={styles.tabBarIcon}
            source={require('../../../asset/image/user.png')}
          />
        );
      }
      return (
        <Image
          style={styles.tabBarIcon}
          source={require('../../../asset/image/user.png')}
        />
      );
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>这是热门</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    width: 21,
    height: 21,
  },
});
