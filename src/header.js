/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Header extends React.PureComponent {
  props: {
    date: string,
    total: number,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.date}
        </Text>
        <View style={styles.display}>
          <Text style={styles.displayText}>
            {this.props.total}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#3F4242',
    alignItems: 'stretch',
  },
  text: {
    flex: 2,
    marginLeft: 32,
    color: 'white',
  },
  display: {
    flex: 8,
    backgroundColor: '#193441',
    paddingTop: 16,
    paddingRight: 16,
  },
  displayText: {
    fontSize: 38,
    color: 'white',
    textAlign: 'right',
  },
});

export default Header;
