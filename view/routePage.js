import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HotVideos from './pages/hotVideos/index';
import LastVideos from './pages/lastestVideos/index';
import AllTypes from './pages/allTypes/index';
import Login from './loginPage';
import FindAccount from './findAccountPage';
import Signin from './regPage';
import videosList from './pages/videosList';
import videoDetails from './pages/videoDetails';
import userConfig from './userConfig';
import {Button, Image} from 'react-native-ui-lib';
const commonStyle = require('../components/commonStyle');

import RightButton from '../components/rightButton';
import LeftButton from '../components/leftButton';
import CustomDrawerContentComponent from './pages/myDrawer';

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
    navigationOptions: ({navigation}) => {
      return {
        headerTitleStyle: {
          alignSelf: 'center',
          color: commonStyle.white,
        },
        headerLeft: () => <LeftButton navigation={navigation} />,
        headerRight: () => <RightButton />,
      };
    },

    tabBarOptions: {
      lazy: true,
      swipeEnabled: true,
      headerRight: {},
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#FFFFFF',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#FFFFFF',
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
        backgroundColor: commonStyle.themeColor,
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
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    }, // 登录页
    Signin: {
      screen: Signin,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    }, // 注册页
    FindAccount: {
      screen: FindAccount,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    }, // 找回密码页
    videosList: {
      screen: videosList,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    },
    videoDetails: {
      screen: videoDetails,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    },
    userConfig: {
      screen: userConfig,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    },
    Main: {
      screen: TabNavigation,
      navigationOptions: {
        headerStyle: {
          headerTitleStyle: {
            alignSelf: 'center',
            color: commonStyle.white,
          },
          backgroundColor: commonStyle.themeColor,
        },
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'screen',
  },
);

const Drawer = createDrawerNavigator(
  {
    Main: {
      screen: APPNavigator,
    },
  },
  {
    overlayColor: 1,
    drawerType: 'slide', //front,back
    initialRouteName: 'Main',
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: CustomDrawerContentComponent, // 自定义抽屉组件
    hideStatusBar: true,
  },
);

export default Drawer;
