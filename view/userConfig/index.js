import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ColorPalette} from 'react-native-ui-lib';
const commonStyle = require('../../components/commonStyle');
export default class userConfig extends Component {
  constructor(props) {
    super();
    this.mainColors = [
      '#66737C',
      '#459FED',
      '#1D5382',
      '#3CC7C5',
      '#65C888',
      '#FAAD4D',
      '#F27052',
      '#F2564D',
      '#B13DAC',
      '#733CA6',
      '#79838A',
      '#5847FF',
      '#00BBF2',
      '#00CD8B',
      '#FF563D',
      '#ffb600',
    ];
    this.state = {
      color1: commonStyle.themeColor,
    };
  }
  onValueChange = (value) => {
    commonStyle.themeColor = value;
    this.setState({
      color1: value,
    });
    console.log(commonStyle.themeColor, this.mainColors[0]);
    // this.setState({color1: value});
  };

  render() {
    const {color1} = this.state;
    return (
      <View>
        <Text margin-10 text10 dark10>
          主体颜色
        </Text>
        <ColorPalette
          value={color1}
          onValueChange={this.onValueChange}
          colors={this.mainColors}
        />
      </View>
    );
  }
}
