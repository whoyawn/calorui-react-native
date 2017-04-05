/**
 * Created by huyanh on 2017. 3. 20..
 * @flow
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
  height: number;
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
    (this: any).renderPage = this.renderPage.bind(this);
    (this: any).adjustPageSize = this.adjustPageSize.bind(this);
  }
  render() {
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

  renderPage({ item }): React.Element<any> {
    return (
      <PageDetail
        entries={item.entries}
        date={item.date}
        style={{ width: this.state.width }}
        onAddEntry={entry => this.props.addEntry(item.key, entry)}
        onRemoveEntry={entryKey => this.props.removeEntry(item.key, entryKey)}
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
function removeEntry(pageKey: string, entryKey : string) {
  return {
    type: 'REMOVE_ENTRY',
    key: pageKey,
    entryKey,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPage: () => dispatch(addPage()),
    addEntry: (pageKey, entry) => dispatch(addEntry(pageKey, entry)),
    removeEntry: (pageKey, entryKey) => dispatch(removeEntry(pageKey, entryKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogViewPager);
