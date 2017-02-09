/**
 * Created by huyanh on 2017. 2. 9..
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Row extends Component {
    render() {//this.props.text comes from spread operator in renderRow
        return (
            <View>
                <Text>{this.props.text}</Text>
            </View>
        );
    }
}

export default Row;