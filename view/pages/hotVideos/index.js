import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';
import {getVideosWithCondition} from '../../../asset/fn/publicFun';
import renderRow from '../videosList/components/mayVideo';
const commonStyle = require('../../../components/commonStyle');
import {Icon} from '../../../components/icon';

export default class LastVideos extends Component {
  static navigationOptions = {
    tabBarLabel: '热门',
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      return (
        <Icon
          name={'oneIcon|home'}
          size={focused ? 30 : 25}
          color={focused ? commonStyle.white : commonStyle.lightGray}
        />
      );
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.getVideos({sort: 'list.star', order: -1, pageNumber: 3});
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
