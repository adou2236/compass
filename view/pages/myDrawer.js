import React, {Component} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

const commonStyle = require('../../components/commonStyle');


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class CustomDrawerContentComponent extends Component {
  render() {
    return (
      <ScrollView>
        <View
          color={'#1AA1E5'}
          leftIconWidth={11}
          leftIconHeight={19}
          textColor={'white'}
        />
        <View
          style={{
            backgroundColor: 'white',
          }}>
          <TouchableOpacity>
            <Text>首页</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>钱包</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>消息</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('userConfig')}>
            <Text>设置</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
