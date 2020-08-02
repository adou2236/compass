import React from 'react';

import {View, Text} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HotVideos from './pages/hotVideos/index';
import LastVideos from './pages/lastestVideos/index';
import AllTypes from './pages/allTypes/index';
import Login from './loginPage';
import FindAccount from './findAccountPage';
import Signin from './regPage';
import videosList from './pages/videosList';
import videoDetails from './pages/videoDetails';
import {Button, Image} from 'react-native-ui-lib';
const settingIcon = require('../asset/image/icons/setting.png');
const TabNavigation = createBottomTabNavigator(
  {
    Hot: {
      screen: HotVideos,
    },
    Last: {
      screen: LastVideos,
    },
    All: {
      screen: AllTypes,
    },
  },
  {
    //默认首页
    initialRouteName: 'Hot',
    navigationOptions: {
      headerRight: <Button iconSource={settingIcon}
                           iconStyle={{width:30,height:30}}
                           size={Button.sizes.xSmall} />,
    },
    tabBarOptions: {
      lazy: true,
      swipeEnabled: true,
      headerRight: {},
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#d24b66',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#000000',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      showLabel: true,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#788493',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 0.1,
      //tab bar的样式
      style: {
        backgroundColor: '#ffffff',
        paddingBottom: 1,
        borderTopWidth: 1,
        paddingTop: 1,
        borderTopColor: '#ccc',
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 11,
        margin: 1,
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: {height: 0},
    },
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: true,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'initialRoute',
  },
);

const APPNavigator = createStackNavigator(
  {
    Login: {screen: Login}, // 登录页
    Signin: {screen: Signin}, // 注册页
    FindAccount: {screen: FindAccount}, // 找回密码页
    videosList: {screen: videosList},
    videoDetails: {screen: videoDetails},
    Main: {
      screen: TabNavigation,
    },
  },
  {
    initialRouteName: 'Main',
    headerMode: 'screen',
  },
);

export default APPNavigator;
