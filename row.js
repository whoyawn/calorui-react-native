/**
 * Created by huyanh on 2017. 2. 9..
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class Row extends Component {
  render() { // this.props.text comes from spread operator in renderRow
    const textTitleComponent = (
      <TouchableOpacity onLongPress={() => this.props.onToggleEdit(true)}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
    const editingTitleComponent = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.title}
          style={styles.input}
          multiline
        />
      </View>
    );

    const textAmountComponent = (
      <TouchableOpacity onLongPress={() => this.props.onToggleEdit(true)}>
        <Text style={styles.text}>{this.props.amount}</Text>
      </TouchableOpacity>
    );
    const editingAmountComponent = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.amount}
          style={styles.input}
          multiline
        />
      </View>
    );

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    );

    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
        );
    return (
      <View style={styles.container}>
        {this.props.editing ? editingTitleComponent : textTitleComponent}
        {this.props.editing ? editingAmountComponent : textAmountComponent}
        {this.props.editing ? doneButton : removeButton }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: '#4d4d4d',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7be290',
    padding: 7,
  },
  doneText: {
    color: '#4d4d4d',
    fontSize: 20,
  },
  text: {
    flex: 1,
    fontSize: 24,
    color: '#141414',
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  },
});

export default Row;
