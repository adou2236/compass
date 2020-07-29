import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';
import renderRow from '../videosList/components/mayVideo';
import {getVideosWithCondition} from '../../../asset/fn/publicFun';

//子组件
// import TypeCard from '../allTypes/component/typeCard';

export default class LastVideos extends Component {
  static navigationOptions = {
    tabBarLabel: '最新',
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      return (
        <Image
          source={require('../../../asset/image/icons/lastest.png')}
          style={{width: 25, height: 25, tintColor: tintColor}}
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
    this.getVideos({sort: 'list.updateTime', order: -1, pageNumber: 3});
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
