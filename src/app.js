/**
 * Created by huyanh on 2017. 3. 14..
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import ViewPager from 'react-native-viewpager';

import Page from './page';

type Props = {}
type PageEntry = {
  date: string,
  total: number,
  inputTitle: string,
  inputAmount: number,
  items: Object[],
}

class App extends Component {

  state: {
    pages: PageEntry[],
  };

  constructor(props: Props) {
    super(props);

    const ds = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state =  {
      pages: [],
      dataSource: ds.cloneWithPages([]),
    };
  }
  // Every new day add a page
  addPage() {

  }

  setSource(items, itemsDataSource, total: number = this.state.total, otherState: any = {}) {
    this.setState({
      items,
      // allows us to keep track of different items than are rendered on the screen
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      total,
      ...otherState, // spread in any other state given
    });
    console.log('save', total);
    const strTotal = total > 0 ? total.toString() : '0';
    AsyncStorage.multiSet([['items', JSON.stringify(items)], ['total', strTotal]]);
  }

  renderPage(data: PageEntry) {
    return (
      <Page
        
      />
    );
  }

  render() {
    return (
      <ViewPager
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        onChangePage={console.log('change')}
        isLoop={false}
        autoPlay={false}
      />
    );
  }
}

export default App;
