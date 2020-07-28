import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Image, Card, Colors, Alert} from 'react-native-ui-lib';
import {Dimensions} from 'react-native';
const smb = require('../../../../asset/image/user.png');

let MainWidth = Dimensions.get('window').width;

export default class TypeCard extends Component {
  constructor(props) {
    super(props); //访问继承父对象的构造器函数
    this.state = {};
  }

  renderComplexImage = (cardProps: CardPropTypes, image: React.ReactNode) => {
    return (
      <Card
        {...cardProps}
        borderRadius={0}
        padding-0
        enableShadow={false}
        style={{borderColor: 'gray', borderWidth: 1}}
        useNative
        onPress={() => {
          this.props.navigation.navigate('videosList', {data: this.props.data});
        }}
        width={MainWidth / 3}
        activeOpacity={1}
        activeScale={0.96}>
        {image}
        <Card.Section
          imageSource={{uri: this.props.data.icon}}
          imageStyle={{
            height: 100,
            border: 'none',
            textAlign: 'center',
          }}
        />
        <Card.Section
          padding-20
          content={[{text: this.props.data.name, text70: true, dark10: true}]}
          contentStyle={{alignItems: 'center'}}
        />
      </Card>
    );
  };
  render() {
    return (
      //此处的view实际不存在
      <View>{this.renderComplexImage()}</View>
    );
  }
}
