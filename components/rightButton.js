import React, {Component} from 'react';
import {Icon} from './icon';
import {TouchableOpacity} from 'react-native';
const commonStyle = require('./commonStyle');
export default class rightButton extends Component {
  constructor(props) {
    super(props);
    this.setPress = () => {
      console.log('点击右边');
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{marginRight: 25}}
        onPress={() => {
          this.setPress();
        }}>
        <Icon name={'oneIcon|search'} size={25} color={commonStyle.white} />
      </TouchableOpacity>
    );
  }
}
