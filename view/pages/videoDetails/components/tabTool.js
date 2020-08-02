import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {TabController, Colors, View, Text, Button} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';
import {commonStyle} from '../../../../components/commonStyle';

import Tab1 from '../pages/introductPage';
import Tab2 from '../pages/commentPage';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const TABS = ['简介', '评论'];

class TabTool extends Component {
  state = {
    asCarousel: true,
    centerSelected: false,
    fewItems: false,
    selectedIndex: 0,
    items: _.chain(TABS)
      .map((tab) => ({label: tab, key: tab}))
      .value(),
    key: Date.now(),
  };

  componentDidMount() {
    console.log('加载中');
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow();
    }, 10);
  }

  addTab = () => {
    const {tabsCount} = this.state;

    if (tabsCount < 6) {
      this.setState({
        tabsCount: tabsCount + 1,
        key: Date.now(),
        selectedIndex: tabsCount,
      });
    }
  };

  toggleItemsCount = () => {
    const {fewItems} = this.state;

    let items;
    if (fewItems) {
      items = _.chain(TABS)
        .map((tab) => ({label: tab, key: tab}))
        .value();
    } else {
      items = _.chain(TABS)
        .take(3)
        .map((tab) => ({label: tab, key: tab}))
        .value();
    }

    this.setState({fewItems: !fewItems, items, key: Date.now()});
  };

  toggleCarouselMode = () => {
    this.setState({
      asCarousel: !this.state.asCarousel,
      key: this.state.asCarousel ? 'asCarousel' : 'staticPages',
    });
  };

  toggleCenterSelected = () => {
    this.setState({
      centerSelected: !this.state.centerSelected,
      key: Date.now(),
    });
  };

  onChangeIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  };

  renderLoadingPage() {
    return (
      <View flex center>
        <ActivityIndicator size="large" color={commonStyle.themeColor} />
        <Text text60L marginT-10 />
      </View>
    );
  }

  renderTabPages() {
    const {asCarousel} = this.state;
    const Container = asCarousel ? TabController.PageCarousel : View;
    const containerProps = asCarousel ? {} : {flex: true};
    return (
      <Container {...containerProps}>
        <TabController.TabPage
          index={0}
          lazy={true}
          lazyLoadTime={0}
          renderLoading={this.renderLoadingPage}>
          <Tab1 />
        </TabController.TabPage>
        <TabController.TabPage
          index={1}
          lazy={true}
          lazyLoadTime={0}
          renderLoading={this.renderLoadingPage}>
          <Tab2 />
        </TabController.TabPage>
      </Container>
    );
  }

  render() {
    const {key, selectedIndex, items, asCarousel} = this.state;
    return (
      <View style={{height: 200}} bg-grey70>
        <TabController
          asCarousel={asCarousel}
          key={key}
          selectedIndex={selectedIndex}
          onChangeIndex={this.onChangeIndex}
          items={items}>
          <TabController.TabBar
            enableShadow
            indicatorStyle={{
              backgroundColor: commonStyle.themeColor,
              height: 3,
            }}
            selectedLabelColor={commonStyle.themeColor}
            labelColor={commonStyle.black}
            activeBackgroundColor={commonStyle.lightGray}>
            {/* {this.renderTabItems()} */}
          </TabController.TabBar>
          {this.renderTabPages()}
        </TabController>
      </View>
    );
  }
}

export default gestureHandlerRootHOC(TabTool);
