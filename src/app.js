// /**
//  * Created by huyanh on 2017. 3. 14..
//  */
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import log from './reducers';
import LogViewPager from './LogViewPager';

class App extends Component {

  render() {
    return (
      <Provider store={createStore(log)}>
        <LogViewPager />
      </Provider>
    );
  }
}

export default App;
