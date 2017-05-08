/**
 * Created by huyanh on 2017. 3. 20..
 * @flow
 */
import React, { Component } from 'react';
import { Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPagerAndroid,
  Platform,
} from 'react-native';
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
class LogViewPager extends React.PureComponent {
  state: State;
  _listRef: FlatList<*>;
  constructor(props: Props) {
    super(props);
    // const { width, height } = Dimensions.get('window');
    this.state = {
      height: 0,
      width: 0,
      initialSelectedIndex: this.props.log.length - 1,
    };
    (this: any).renderPage = this.renderPage.bind(this);
    (this: any).adjustPageSize = this.adjustPageSize.bind(this);
  }

  render() {
    // i have no idea why this fixes it. i dont even need it now that i have getitemlayout
    const log = [...this.props.log];
    return (
      <ViewPagerAndroid
        initialPage={this.state.initialSelectedIndex}
        style={styles.container}
      >
        <PageDetail
          entries={[]}
          date={[]}
        />
      </ViewPagerAndroid>
    );
    return (
      <View style={styles.container}>
        <FlatList
          ref={(flatList) => { this._listRef = flatList; }}
          data={this.props.log}
          onLayout={this.adjustPageSize}
          renderItem={this.renderPage}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => {
            // make this a prop later
            const width = Dimensions.get('window').width;
            // return { length: 0, offset: width * index, index }; oddly works
            return { length: this.state.width, offset: width * index, index }; // only works because in the beginning width is 0
          }}
          removeClippedSubviews={false}
          horizontal
          pagingEnabled
          directionalLockEnabled
        />
        <TouchableOpacity
          style={{ backgroundColor: 'red', paddingTop: 30 }}
          onPress={this.props.addPage}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', paddingTop: 20 }}
          onPress={() => {
            if (this._listRef) { this._listRef.scrollToEnd({ animated: true }); }
          }}
        >
          <Text>scroll</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this._listRef.scrollToEnd({ animated: false });
    }
  }

  adjustPageSize(e: any) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
    console.log(e.nativeEvent.layout.width);
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
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  log: state.log,
});

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

const mapDispatchToProps = dispatch => ({
  addPage: () => dispatch(addPage()),
  addEntry: (pageKey, entry) => dispatch(addEntry(pageKey, entry)),
  removeEntry: (pageKey, entryKey) => dispatch(removeEntry(pageKey, entryKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogViewPager);
