import React, {Component} from 'react';
import {StyleSheet, Alert, Dimensions} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
const smb = require('../../../../asset/image/user.png');
import {
  View,
  AnimatableManager,
  ThemeManager,
  Text,
  Image,
  ListItem,
} from 'react-native-ui-lib';
let MainWidth = Dimensions.get('window').width;

//视频列表，此处使用方法组件，不做状态处理，需要从上一步继承路由表
export default function renderRow(row, index, callBack) {
  function goToDetails(id) {
    callBack(id);
    // Alert.alert(`pressed on contact #${id}`);
  }
  const renderOverlayContent = (
    <View flex bottom={true}>
      <View style={styles.message} row centerV>
        <Text text70 white>
          2020-10-10
        </Text>
        <Text text70 white>
          32:00
        </Text>
      </View>
    </View>
  );
  const animationProps = AnimatableManager.getEntranceByIndex(index);
  return (
    <AnimatableView {...animationProps}>
      <ListItem
        containerStyle={styles.MainBox}
        key={row.id}
        onPress={() => goToDetails(row.id)}>
        <ListItem.Part flex-1 style={styles.a} height={230}>
          <Image
            assetGroup={'暂无图片'}
            height={200}
            supportRTL={true}
            source={smb}
            cover={true}
            customOverlayContent={renderOverlayContent}
            overlayType={'vertical'}
          />
          <Text text65T numberOfLines={1} style={styles.b}>
            {row.name}
          </Text>
        </ListItem.Part>
      </ListItem>
    </AnimatableView>
  );
}
const styles = StyleSheet.create({
  a: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  b: {
    padding: 10,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  MainBox: {
    height: 230,
    marginTop: 10,
    marginBottom: 10,
    width: MainWidth * 0.8,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
