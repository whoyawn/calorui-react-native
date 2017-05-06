/**
 * Created by huyanh on 2017. 3. 14..
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import LogViewPager from './LogViewPager';
import configureStore from './configureStore';

// const store = initialStore();

class App extends Component {

  state = {
    loaded: false,
    store: null,
  };

  async componentWillMount() {
    const store = await configureStore(() => this.setState({ store }));
    console.log(store.getState());
  }

  render() {
    if (this.state.store === null) { return (<Text>Loading</Text>); }

    return (
      <Provider store={this.state.store}>
        <LogViewPager />
      </Provider>
    );
  }
}

export default App;
