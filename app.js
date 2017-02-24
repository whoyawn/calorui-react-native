/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage } from 'react-native';
import Header from './header';
import FoodInput from './foodinput';
import Row from './row';

class App extends Component {
  constructor(props) {
    super(props);
    // A rowHasChanged function is required to use ListView. Here we just say a
    // row has changed if the row we are on is not the same as the previous row.
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      total: 0,
      title: '', // will hold value for textinput
      amount: '',
      items: [], // food items to input
      // The clone methods suck in the new data and compute a diff for each row
      // so ListView knows whether to re-render it or not.
      dataSource: ds.cloneWithRows([]),
    };
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('items').then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false });
      } catch (e) {
        console.log('error');
      }
    });
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text,
      };
    });
    this.setSource(newItems, newItems);
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing,
      };
    });
    this.setSource(newItems, newItems);
  }

  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      // allows us to keep track of different items than are rendered on the screen
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState, // spread in any other state given
    });
    AsyncStorage.setItem('items', JSON.stringify(items));
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => item.key !== key);
    this.setSource(newItems, newItems);
  }

  handleAddItem() {
// if i gave handleadditem a parameter bool then it does weird behavior if
    // i set the handler for FoodInput passing in a bool
    if (!this.state.amount) return; // don't add empty calories
    const newItems = [
      ...this.state.items, // spread old items into array
      {
        key: Date.now(), // just unique identifier
        title: this.state.title, // add text of value just entered
        amount: this.state.amount,
      },
    ];
    if (this.state.amount !== '') this.state.total += parseInt(this.state.amount, 10);
    // now set new state and clear out text
    this.setSource(newItems, newItems, { title: '', amount: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          total={this.state.total}
        />
        <FoodInput
          title={this.state.title}
          amount={this.state.amount}
          onAddAmount={this.handleAddItem}
          onChangeTitle={title => this.setState({ title })}
          onChangeAmount={amount => this.setState({ amount })}
        />
        <View style={styles.content}>
          <ListView
            style={styles.content}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            // passed value of what we set in our datasource
            // each value of the spread is the rest of the object
            renderRow={({ key, ...value }) => (
              <Row
                key={key}
                onUpdate={text => this.handleUpdateText(key, text)}
                onToggleEdit={editing => this.handleToggleEditing(key, editing)}
                onRemove={() => this.handleRemoveItem(key)}
                {...value}
              />
            )}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
        </View>
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 30 },
    }),
  },
  header: {
    flex: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  content: {
    flex: 2,
  },
  list: {
    backgroundColor: '#FFF',
    borderColor: '#F5F5F5',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
});

export default App;
