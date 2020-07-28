import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';

//子组件
import TypeCard from '../allTypes/component/typeCard';

export default class LastVideos extends Component {
  static navigationOptions = {
    tabBarLabel: '最新',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return (
          <Image
            style={styles.tabBarIcon}
            source={require('../../../asset/image/types.svg')}
          />
        );
      }
      return (
        <Image
          style={styles.tabBarIcon}
          source={require('../../../asset/image/types.svg')}
        />
      );
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TypeCard name="电影" />
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
