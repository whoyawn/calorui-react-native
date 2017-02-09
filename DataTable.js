/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

class DataTable extends Component {
    render() {
        return (
            <View style={styles.header}>
                <TextInput
                    value={this.props.value} // will be app's state.value
                    onChange={this.props.onChange}
                    onSubmitEditing={this.props.onAddItem}
                    placeholder="add a food item"
                    blurOnSubmit={false}
                    returnKeyType="done"
                    style={styles.input}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 50
    }
});

export default DataTable;