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

let MainWidth = Dimensions.get('window').width;

//视频列表页
export default class videosList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.data.name}`,
  });
  constructor(props) {
    super(props);

    this.state = {
      videos: [
        {id: '0', name: 'transmormer2'},
        {id: '1', name: 'harrypoter2'},
        {id: '2', name: 'matraxio'},
        {id: '3', name: 'transmormer2'},
        {id: '4', name: 'transmormer3'},
      ],
    };
  }
  goToDetials = (id) => {
    console.log(this.props);
    this.props.navigation.navigate('videoDetails', {id: id});
  };
  keyExtractor = (item) => item.id;

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.MainBox}
        data={this.state.videos}
        renderItem={({item, index}) => renderRow(item, index, this.goToDetials)}
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
