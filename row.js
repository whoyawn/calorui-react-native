/**
 * Created by huyanh on 2017. 2. 9..
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

class Row extends Component {
    render() {//this.props.text comes from spread operator in renderRow
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
                <TouchableOpacity onPress={this.props.onRemove}>
                    <Text style={styles.destroy}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    text: {
        flex: 1,
        fontSize: 24,
        color: "#4d4d4d"
    },
    destroy: {
        fontSize: 20,
        color: "#cc9a9a"
    }
});

export default Row;