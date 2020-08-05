import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Modal,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
const commonStyle = require('./commonStyle');
import {Icon} from './icon';
// import {Slider} from 'react-native-ui-lib';

const deviceInfo = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height,
};
//以一般视频高度16：9设置容器高度
const playerHeight = (deviceInfo.deviceWidth / 16) * 9;

export default class MoviePlayer extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      timer: {},
      clickTimes: 0,
      rate: 1,
      slideValue: 0.0,
      currentTime: 0.0,
      duration: 1.0,
      paused: false,
      playIcon: 'music_paused_o',
      isTouchedScreen: true,
      modalVisible: true,
      isLock: false,
      movieInfo: {
        url: this.props.movieInfo.url,
        title: this.props.movieInfo.title,
      },
      orientation: null,
      specificOrientation: null,
    };
  }

  UNSAFE_componentWillMount() {
    const init = Orientation.getInitialOrientation();
    this.setState({
      init,
      orientation: init,
      specificOrientation: init,
    });
  }

  componentDidMount() {
    //获取视频地址
    Orientation.addOrientationListener(this._updateOrientation);
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
    Orientation.removeOrientationListener(this._updateOrientation);
    Orientation.removeSpecificOrientationListener(
      this._updateSpecificOrientation,
    );
  }

  _updateOrientation = (orientation) => this.setState({orientation});
  _updateSpecificOrientation = (specificOrientation) =>
    this.setState({specificOrientation});

  loadStart(data) {
    console.log('loadStart', data);
  }

  setDuration(duration) {
    this.setState({duration: duration.duration});
  }
  //点击事件，单击隐藏ui双击暂停
  async videoPlayerTouch() {
    await this.setState({
      clickTimes: this.state.clickTimes + 1,
    });
    if (this.state.timer && this.state.clickTimes >= 2) {
      this.setState({paused: !this.state.paused, clickTimes: 0});
      clearTimeout(this.state.timer);
    } else {
      this.state.timer = setTimeout(() => {
        this.setState({isTouchedScreen: !this.state.isTouchedScreen});
        this.setState({clickTimes: 0});
      }, 300);
    }
  }

  //进度条改变
  sliderChange(value) {
    this.setState({
      paused: true,
      currentTime: value,
    });
  }

  //进度条改变结束
  sliderChangeOver(value) {
    this.setState({
      paused: false,
      modalVisible: true,
    });
    this.player.seek(value);
  }

  //改变视频时间再视频时间同步到进度条中，同步操作
  async setTime(data) {
    // console.log('视频播放中', data);
    await this.setState({
      currentTime: data.currentTime,
      modalVisible: false,
    });
    let sliderValue = Number(this.state.currentTime);
    await this.setState({
      slideValue: sliderValue,
    });
  }

  //视频的播放状态发生变化时
  onPlayStateChange(data) {
    this.setState({
      playIcon: data.playbackRate ? 'music_paused_o' : 'music_playing_s',
    });
  }

  onEnd(data) {
    this.player.seek(0);
  }

  videoError(error) {
    this.showMessageBar('播放器报错啦！')(error.error.domain)('error');
    this.setState({
      modalVisible: false,
    });
  }

  onBuffer(data) {
    // console.log('onBuffer', data);
  }

  onTimedMetadata(data) {
    console.log('onTimedMetadata', data);
  }

  showMessageBar = (title) => (msg) => (type) => {
    // 消息
  };

  formatMediaTime(duration) {
    let min = Math.floor(duration / 60);
    let second = duration - min * 60;
    min = min >= 10 ? min : '0' + min;
    second = second >= 10 ? second : '0' + second;
    return min + ':' + second;
  }

  play() {
    this.setState({
      paused: !this.state.paused,
      // playIcon: this.state.paused ? 'music_paused_o' : 'music_playing_s',
    });
  }

  renderModal() {
    return (
      //缓冲图案
      <Modal
        style={{height: 30}}
        animationType={'none'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => Alert.alert('Modal has been closed.')}>
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            color={commonStyle.themeColor}
            size="large"
          />
        </View>
      </Modal>
    );
  }

  render() {
    const {orientation, isLock} = this.state;
    const url = this.state.movieInfo.url;
    const title = this.state.movieInfo.title;
    return url ? (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.movieContainer,
          {
            //横屏模式判断
            width:
              orientation === 'PORTRAIT'
                ? deviceInfo.deviceWidth
                : deviceInfo.deviceHeight,
            height:
              orientation === 'PORTRAIT'
                ? playerHeight
                : deviceInfo.deviceWidth,
            paddingTop:
              orientation === 'PORTRAIT' ? (Platform.OS === 'ios' ? 40 : 0) : 0,
          },
        ]}
        onPress={() => this.videoPlayerTouch()}>
        <Video
          source={{uri: url}}
          ref={(ref) => (this.player = ref)}
          rate={this.state.rate}
          volume={1.0}
          muted={false}
          paused={this.state.paused}
          resizeMode="contain"
          repeat={true}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch={'ignore'}
          progressUpdateInterval={250.0}
          onLoadStart={(data) => this.loadStart(data)}
          onLoad={(data) => this.setDuration(data)}
          onProgress={(data) => this.setTime(data)}
          onEnd={(data) => this.onEnd(data)}
          onError={(data) => this.videoError(data)}
          onBuffer={(data) => this.onBuffer(data)}
          onPlaybackRateChange={(data) => this.onPlayStateChange(data)}
          onTimedMetadata={(data) => this.onTimedMetadata(data)}
          style={[
            styles.videoPlayer,
            {
              top:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'ios'
                    ? 40
                    : 0
                  : 0,
            },
          ]}
        />

        {this.state.isTouchedScreen && !isLock ? (
          <View
            style={[
              styles.navContentStyle,
              {
                marginTop:
                  orientation === 'PORTRAIT'
                    ? 0
                    : Platform.OS === 'ios'
                    ? 20
                    : 0,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: commonStyle.center,
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: commonStyle.clear,
                }}
                onPress={
                  orientation === 'PORTRAIT'
                    ? () => {
                        Orientation.lockToPortrait;
                        this.props.navigation.pop();
                      }
                    : Orientation.lockToPortrait
                }>
                <Icon
                  name={'oneIcon|nav_back_o'}
                  size={18}
                  color={commonStyle.white}
                />
              </TouchableOpacity>
              <Text
                style={{
                  backgroundColor: commonStyle.clear,
                  color: commonStyle.white,
                  marginLeft: 10,
                }}>
                {title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: commonStyle.center,
                justifyContent: commonStyle.between,
              }}>
              <TouchableOpacity
                style={styles.navToolBar}
                onPress={() => Alert.alert('切换电视！')}>
                <Icon
                  name={'oneIcon|tv_o'}
                  size={20}
                  color={commonStyle.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navToolBar}
                onPress={() => Alert.alert('开启VR！')}>
                <Icon
                  name={'oneIcon|video_o'}
                  size={20}
                  color={commonStyle.white}
                />
              </TouchableOpacity>
              {orientation !== 'PORTRAIT' ? (
                <View
                  style={{
                    flexDirection: commonStyle.row,
                    alignItems: commonStyle.center,
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.navToolBar,
                      {
                        borderColor: commonStyle.white,
                        borderWidth: 0.5,
                        padding: 3,
                      },
                    ]}
                    onPress={() => Alert.alert('开启弹幕！')}>
                    <Text style={{color: commonStyle.white, fontSize: 12}}>
                      弹
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navToolBar}
                    onPress={() => Alert.alert('分享！')}>
                    <Icon
                      name={'oneIcon|share_dot_o'}
                      size={20}
                      color={commonStyle.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navToolBar}
                    onPress={() => Alert.alert('下载！')}>
                    <Icon
                      name={'oneIcon|download_o'}
                      size={20}
                      color={commonStyle.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navToolBar}
                    onPress={() => Alert.alert('设置画面！')}>
                    <Icon
                      name={'oneIcon|more_v_o'}
                      size={20}
                      color={commonStyle.white}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View></View>
        )}
        {orientation !== 'PORTRAIT' ? (
          <TouchableOpacity
            onPress={() => this.setState({isLock: !this.state.isLock})}
            style={{
              width: 40,
              justifyContent: 'center',
              paddingHorizontal: 10,
              zIndex: 1,
            }}>
            <Icon
              name={`oneIcon|${this.state.isLock ? 'locked_o' : 'unlocked_o'}`}
              size={20}
              color={commonStyle.white}
              style={{backgroundColor: commonStyle.blue}}
            />
          </TouchableOpacity>
        ) : null}
        {this.state.isTouchedScreen && !isLock ? (
          <View
            style={[
              styles.toolBarStyle,
              {
                marginBottom:
                  orientation === 'PORTRAIT'
                    ? 5
                    : Platform.OS === 'ios'
                    ? 20
                    : 0,
              },
            ]}>
            <TouchableOpacity onPress={() => this.play()}>
              <Icon
                name={`oneIcon|${this.state.playIcon}`}
                size={18}
                color={commonStyle.white}
              />
            </TouchableOpacity>
            <View style={styles.progressStyle}>
              <Text style={styles.timeStyle}>
                {this.formatMediaTime(Math.floor(this.state.currentTime))}
              </Text>
              {/*//进度条*/}
              <Slider
                style={styles.slider}
                value={this.state.slideValue}
                maximumValue={this.state.duration}
                minimumTrackTintColor={commonStyle.themeColor}
                maximumTrackTintColor={commonStyle.iconGray}
                thumbTintColor={commonStyle.themeColor}
                thumbTintWidth={10}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                onValueChange={(value) => this.sliderChange(value)}
                onSlidingComplete={(value) => this.sliderChangeOver(value)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: 35,
                }}>
                <Text style={{color: commonStyle.white, fontSize: 12}}>
                  {this.formatMediaTime(Math.floor(this.state.duration))}
                </Text>
              </View>
            </View>
            {orientation === 'PORTRAIT' ? (
              <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                <Icon
                  name={'oneIcon|scale_o'}
                  size={18}
                  color={commonStyle.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={Orientation.lockToPortrait}>
                <Icon
                  name={'oneIcon|shrink_o'}
                  size={18}
                  color={commonStyle.white}
                />
              </TouchableOpacity>
            )}
          </View>
        ) :  <View></View>}
        {this.renderModal()}
      </TouchableOpacity>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'space-between',
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  //顶部工具
  navContentStyle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  //底部工具
  toolBarStyle: {
    // backgroundColor: commonStyle.black,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    height: 30,
  },
  timeStyle: {
    width: 35,
    color: commonStyle.white,
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
    height: 20,
  },
  progressStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  indicator: {
    height: playerHeight,
    width: deviceInfo.deviceWidth,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navToolBar: {
    backgroundColor: commonStyle.clear,
    marginHorizontal: 5,
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 5,
  },
  track: {
    height: 2,
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 13,
    borderColor: commonStyle.white,
    borderWidth: 1,
  },
});
