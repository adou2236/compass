import React, {Component} from 'react';
import {Icon} from './icon';
const commonStyle = require('./commonStyle');
import {TouchableOpacity} from 'react-native';

export default class leftButton extends Component {
  constructor(props) {
    super(props);
  }

  setPress = () => {
    console.log(this.props.navigation.toggleDrawer());
  };

  render() {
    return (
      <TouchableOpacity
        style={{marginLeft: 20}}
        onPress={() => {
          this.setPress();
        }}>
        <Icon name={'oneIcon|menu_open'} size={25} color={commonStyle.white} />
      </TouchableOpacity>
    );
  }
}
