import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {
  Text,
  View,
  Image,
  Button,
  ThemeManager,
  ListItem,
} from 'react-native-ui-lib';
import renderRow from './components/mayVideo';

import {getVideosWithCondition} from '../../../asset/fn/publicFun';

let MainWidth = Dimensions.get('window').width;

//视频列表页
export default class videosList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.data.name}`,
  });
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params.data._id);
    this.getVideos({
      type: this.props.navigation.state.params.data._id,
    });
  }
  getVideos(index) {
    getVideosWithCondition(index)
      .then((res) => {
        if (res.data.status === 200) {
          this.setState({
            videos: res.data.data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  goToDetials = (id, name) => {
    this.props.navigation.navigate('videoDetails', {id: id, name: name});
  };
  keyExtractor = (item) => item.list._id;

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.MainBox}
        data={this.state.videos}
        renderItem={({item, index}) =>
          renderRow(item.list, index, this.goToDetials)
        }
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  MainBox: {
    display: 'flex',
    alignItems: 'center',
  },
});
