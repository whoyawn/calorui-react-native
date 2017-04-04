/**
 * Created by huyanh on 2017. 3. 22..
 */
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Platform, View, Text, StyleSheet } from 'react-native';
import FoodInput from './foodinput';
import Header from './header';
import Row from './row';

import { Entries } from './reducers/entries';

type Props = {
  entries: Entries
}

class PageDetail extends React.PureComponent {

  state: {
    loading: boolean,
    total: number,
    title: string,
    amount: string,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      total: 0,
      title: '',
      amount: '',
    };
    this.renderRow = this.renderRow.bind(this);
    this.handleAddEntry = this.handleAddEntry.bind(this);
  }

  handleAddEntry() {
    const newEntry = {
      key: Date.now(),
      title: this.state.title,
      amount: this.state.amount,
    };
    this.props.onAddEntry(newEntry);
    this.setState({
      title: '',
      amount: '',
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Header
          style={styles.header}
          date={this.props.date}
          total={'0'}
        />
        <FoodInput
          title={this.state.title}
          amount={this.state.amount}
          onAddAmount={this.handleAddEntry}
          onChangeTitle={title => this.setState({ title })}
          onChangeAmount={amount => this.setState({ amount })}
        />
        <FlatList
          data={this.props.entries}
          renderItem={this.renderRow}
        />
        {this.props.loading &&
        <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
      </View>
    );
  }

  renderRow({ item }) {
    return (
      <Row
        onToggleEdit={() => {}}
        title={item.title}
        onUpdate={() => {}}
        amount={item.amount}
        onRemove={() => {}}
      />
    )
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


export default PageDetail;
