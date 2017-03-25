/**
 * Created by huyanh on 2017. 3. 20..
 */
import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PageDetail from './PageDetail';

import type { Log } from './reducers/days';

type Props = {
  log: Log,
}

type State = {
  width: number;
  selectedIndex: number;
}
// TODO: getItemLayout for FlatList, since item heights are constant
class LogViewPager extends Component {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      selectedIndex: 0,
    };
    this.renderPage = this.renderPage.bind(this);
    this.adjustPageSize = this.adjustPageSize.bind(this);
  }
  render() {
    const fakeLog = [
      {
        key: 0,
        date: 'monday',
        entries: [{key: 'asdf', title: 'poop', amount: '645'},],
      },
      {
        key: 1,
        date: 'tuesday',
        entries: [{key: 'asasdfdf', title: 'poop', amount: '645'},{key: 'af', title: 'pee', amount: '645'}],
      },
      {
        key: 2,
        date: 'wednesday',
        entries: [{key: 'asasdfdf', title: 'poop', amount: '645'},{key: 'af', title: 'pee', amount: '645'}],
      },
    ];
    return (
      <FlatList
        style={styles.flatList}
        data={fakeLog}
        onLayout={this.adjustPageSize}
        renderItem={this.renderPage}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        directionalLockEnabled
      />
    );
  }

  adjustPageSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  }

  renderPage({ item }): React.Element {
    return (
      <PageDetail
        entries={item.entries}
        style={{width: this.state.width}}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {

  }
}

export default LogViewPager;
