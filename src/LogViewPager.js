/**
 * Created by huyanh on 2017. 3. 20..
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PageDetail from './PageDetail';

import type { Log } from './reducers/days';
import type { Entry } from './reducers/entries';

type Props = {
  log: Log,
  addPage: () => void,
  addEntry: (pageKey: string, entry: Entry) => void,
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
      height: 0,
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
        entries: [{key: 'asasdfdf', title: 'page', amount: '645'},{key: 'af', title: 'last', amount: '645'}],
      },
    ];
    return (
      <View style={styles.flatList}>
        <TouchableOpacity style={{backgroundColor: 'red' ,paddingTop: 30}}
                          onPress={this.props.addPage}>
          <Text>+</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.log}
          onLayout={this.adjustPageSize}
          renderItem={this.renderPage}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          directionalLockEnabled
        />
      </View>
    );
  }

  adjustPageSize(e: any) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }

  renderPage({ item }): React.Element {
    return (
      <PageDetail
        entries={item.entries}
        date={item.date}
        style={{ width: this.state.width }}
        onAddEntry={entry => this.props.addEntry(item.key, entry)}
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
    log: state.log,
  };
};

// Action creators
function addPage() {
  return {
    type: 'ADD_PAGE',
    key: Date.now(),
    date: 'monday',
  };
}
function addEntry(pageKey: string, entry: Entry) {
  return {
    type: 'ADD_ENTRY',
    key: pageKey,
    entry,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPage: () => dispatch(addPage()),
    addEntry: (pageKey, entry) => dispatch(addEntry(pageKey, entry)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogViewPager);
