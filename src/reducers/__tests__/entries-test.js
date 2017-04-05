/**
 * Created by huyanh on 2017. 4. 5..
 *
 */
import deepFreeze from 'deep-freeze';
import days from '../days';

describe('entries reducer', () => {
  test('it is empty by default', () => {
    const fakeLog = [
      {
        key: 0,
        date: 'monday',
        entries: [{ key: 'asdf', title: 'poop', amount: '645' }],
      },
    ];
    const action = {
      type: 'ADD_PAGE',
      pageId: '2',
      date: 'monday',
    };
    deepFreeze(fakeLog);
    deepFreeze(action);
    expect(days(fakeLog, action)[1].entries).toEqual([]);
  });

  test('it deletes entries from page', () => {
    const fakeLog = [
      {
        key: '0',
        date: 'monday',
        entries: [{ key: 'asdf', title: 'poop', amount: 645 }],
      },
      {
        key: '1',
        date: 'tuesday',
        entries: [{ key: 'asasdfdf', title: 'poop', amount: 645 }, { key: 'af', title: 'pee', amount: 645 }],
      },
      {
        key: '2',
        date: 'wednesday',
        entries: [{ key: 'asasdfdf', title: 'page', amount: 645 }, { key: 'af', title: 'last', amount: 645 }],
      },
    ];
    const action = {
      type: 'REMOVE_ENTRY',
      key: '2',
      entryKey: 'asasdfdf',
    };
    deepFreeze(fakeLog);
    deepFreeze(action);
    const logAfter = [
      {
        key: '0',
        date: 'monday',
        entries: [{ key: 'asdf', title: 'poop', amount: 645 }],
      },
      {
        key: '1',
        date: 'tuesday',
        entries: [{ key: 'asasdfdf', title: 'poop', amount: 645 }, { key: 'af', title: 'pee', amount: 645 }],
      },
      {
        key: '2',
        date: 'wednesday',
        entries: [{ key: 'af', title: 'last', amount: 645 }],
      },
    ];
    expect(days(fakeLog, action)).toEqual(logAfter);
    const action2 = {
      type: 'REMOVE_ENTRY',
      key: '2',
      entryKey: 'af',
    };
    const logAfter2 = [
      {
        key: '0',
        date: 'monday',
        entries: [{ key: 'asdf', title: 'poop', amount: 645 }],
      },
      {
        key: '1',
        date: 'tuesday',
        entries: [{ key: 'asasdfdf', title: 'poop', amount: 645 }, { key: 'af', title: 'pee', amount: 645 }],
      },
      {
        key: '2',
        date: 'wednesday',
        entries: [],
      },
    ];
    deepFreeze(logAfter2);
    deepFreeze(action2);
    expect(days(logAfter, action2)).toEqual(logAfter2);
  });
});
