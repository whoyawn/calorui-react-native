/**
 * Created by huyanh on 2017. 2. 8..
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from "react-native";
import Header from "./header";
import DataTable from "./datatable";
import Row from "./row";

class App extends Component {
    constructor(props) {
        super(props);
        //A rowHasChanged function is required to use ListView. Here we just say a
        // row has changed if the row we are on is not the same as the previous row.
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            value: "", // will hold value for textinput
            items: [], // food items to input
            //The clone methods suck in the new data and compute a diff for each row
            // so ListView knows whether to re-render it or not.
            dataSource: ds.cloneWithRows([])
        };
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.setSource = this.setSource.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }
    setSource(items, itemsDataSource, otherState = {}) {
        this.setState({
            items,
            // allows us to keep track of different items than are rendered on the screen
            dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
            ...otherState // spread in any other state given
        })
    }
    handleRemoveItem(key) {
        const newItems = this.state.items.filter((item) => {
            return item.key !== key;
        });
        this.setSource(newItems, newItems)
    }
    handleAddItem() {
        if(!this.state.value) return; // don't add empty text
        const newItems = [
            ...this.state.items, //spread old items into array
            {
                key: Date.now(), //just unique identifier
                text: this.state.value, //add text of value just entered
                test: 'hihihihihi'
            }
        ];
        // now set new state and clear out text
        this.setSource(newItems, newItems, { value: "" });
    }
    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <DataTable
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    onChange={(value) => this.setState({ value })}
                />
                <View style={styles.content}>
                    <ListView style={styles.content}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        onScroll={() => Keyboard.dismiss()}
                        //passed value of what we set in our datasource
                        // each value of the spread is the rest of the object
                        renderRow={({ key, ...value}) => {

                            return (
                                <Row
                                    key={key}
                                    onRemove={() => this.handleRemoveItem(key)}
                                    { ...value}
                                />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return <View key={rowId} style={styles.separator}/>
                        }}
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        ...Platform.select({
            ios: { paddingTop: 30 }
        })
    },
    content: {
        flex: 1
    },
    list: {
        backgroundColor: '#FFF',
        borderColor: "#F5F5F5"
    },
    separator: {
        borderWidth: 1,
        borderColor: "#F5F5F5"
    }
});

export default App;