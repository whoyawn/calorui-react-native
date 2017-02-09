/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text
                    style={styles.text}>
                    add in yo dumb calories</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 16,
        backgroundColor: "#3F4242",
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        marginLeft: 16,
        height: 50,
        color: "white"
    }
});

export default Header;