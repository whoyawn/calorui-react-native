/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class FoodInput extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          value={this.props.title} // will be app's state.value
          onChangeText={this.props.onChangeTitle}
          onSubmitEditing={this.props.onAddTitle}
          placeholder="add a food item"
          blurOnSubmit={false}
          returnKeyType="next"
          style={styles.inputLeft}
        />
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChangeAmount}
          placeholder="amount calories"
          blurOnSubmit={false}
          returnKeyType="done"
          keyboardType="numeric"
          style={styles.inputRight}
        />
        <TouchableOpacity style={styles.done} onPress={this.props.onAddAmount}>
          <Text style={styles.doneText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLeft: {
    paddingLeft: 16,
    flex: 5,
    height: 50,
    backgroundColor: '#93C355',
    color: 'white',
  },
  inputRight: {
    paddingLeft: 16,
    flex: 5,
    height: 50,
    backgroundColor: '#FF8463',
    color: 'white',
  },
  done: {
    flex: 2,
    backgroundColor: '#e2baa7',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 30,
    color: 'white',
  },
});

export default FoodInput;
