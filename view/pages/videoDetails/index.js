import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import MoviePlayer from '../../../components/videoPlayer';
import TabTool from './components/tabTool';
let MainWidth = Dimensions.get('window').width;

export default class videoDetails extends Component {
  static navigationOptions = ({navigation}) => ({
    headerShown: false,
    title: `${navigation.state.params.name}`,
  });
  constructor(props) {
    super(props);
    this.state = {
      data: {
        url: 'https://rbv01.ku6.com/wifi/o_1eb54m475esr126h16n91o611aeqd',
        title: '视频标题',
      },
    };
  }
  loadStart = () => {
    console.log('视频开始加载');
  };
  render() {
    console.log('接受的参数是', this.props.navigation.state.params.id);
    return (
      <View>
        <StatusBar
          hidden={true}
          backgroundColor="#000000"
          barStyle="dark-content"
        />
        <MoviePlayer
          navigation={this.props.navigation}
          movieInfo={this.state.data}
        />
        <View>
          <TabTool />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: MainWidth,
    height: 200,
    backgroundColor: 'black',
    top: 44,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tabbar: {
    marginVertical: 10
  }
});
