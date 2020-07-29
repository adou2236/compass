import React, {Component} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, View, Image, AnimatableManager} from 'react-native-ui-lib';
import TypeCard from './component/typeCard';
import {View as AnimatableView} from 'react-native-animatable';

//接口请求
import {getAllTypes} from '../../../api/apis/videosApi';

export default class AllTypes extends Component {
  constructor() {
    super();
    this.state = {
      allList: [],
    };
  }
  static navigationOptions = {
    tabBarLabel: '分类',
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      return (
        <Image
          source={require('../../../asset/image/icons/types.png')}
          style={{width: 25, height: 25, tintColor: tintColor}}
        />
      );
    },
  };
  componentDidMount() {
    getAllTypes()
      .then((res) => {
        if (res.data.status === 200) {
          this.setState({
            allList: res.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let typeList = [];
    this.state.allList.forEach((item, index) => {
      const animationProps = AnimatableManager.getEntranceByIndex(index);
      //子组件做跳转需要将包含的路由带入才能在组件中处理事件
      typeList.push(
        <AnimatableView key={index} {...animationProps}>
          <TypeCard navigation={this.props.navigation} data={item} />
        </AnimatableView>,
      );
    });

    return (
      <ScrollView>
        <View
          style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}
          row
          spread>
          {typeList}
        </View>
      </ScrollView>
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
