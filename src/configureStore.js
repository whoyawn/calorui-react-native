/**
 * Created by huyanh on 2017. 4. 5..
 */
import { compose, createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import throttle from 'lodash/throttle';
import reducers from './reducers';

const saveState = (state) => {
  AsyncStorage.setItem('state', JSON.stringify(state));
};

export const initialStore = state => createStore(reducers, state);

const configureStore = (onComplete: ?() => void) => {
  // AsyncStorage.getItem('state').then((state) => {
  //   try {
  //     const serializedState = JSON.parse(state);
  //     if (serializedState === null) {
  //       // If there is nothing stored yet, then pass the default initialized store
  //       const store = initialStore({ log: [{ key: Date.now(), date: 'monday', entries: [] }] });
  //       store.subscribe(throttle(() => {
  //         saveState(store.getState());
  //       }, 1000));
  //       console.log('if');
  //       console.log(store);
  //       onComplete(store);
  //       return;
  //     }
  //     console.log('escape');
  //     console.log(serializedState);
  //
  //     const store = initialStore(serializedState);
  //     store.subscribe(throttle(() => {
  //       saveState(store.getState());
  //     }, 1000));
  //     onComplete(store);
  //   } catch (e) {
  //     console.log('some error');
  //   }
  // });

  // return new Promise((resolve, reject) => {
  //   try {
  //     const store = createStore(reducers, undefined, compose(autoRehydrate()));
  //     persistStore(store, { storage: AsyncStorage }, () => resolve(store));
  //   } catch (e) {
  //     reject(e);
  //   }
  // });


  const store = createStore(reducers, undefined, compose(autoRehydrate()));
  persistStore(store, { storage: AsyncStorage }, onComplete);// add .purge() to reset
  return store;
};
export default configureStore;
