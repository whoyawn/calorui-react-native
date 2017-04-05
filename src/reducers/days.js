/**
 * Created by huyanh on 2017. 3. 20..
 * @flow
 */
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';

import type { Action } from '../actions/types';
import entries from './entries';

export type Page = {
  key: number,
  date: string,
  entries: Array<{ name: string, amount: number }>
}

export type Log = Array<Page>;

const initialState = [];

function day(state: any, action: Action): Page {
  if (action.type === 'ADD_PAGE') {
    return {
      key: action.key,
      date: action.date,
      entries: [],
    };
  }
  return state;
}

function days(state: Log = initialState, action: Action): Log {
  // Update days array
  if (action.type === 'ADD_PAGE') {
    return [
      ...state,
      day(undefined, action),
    ];
  }

  // Update individual day
  if (action.type === 'ADD_ENTRY' || action.type === 'REMOVE_ENTRY') {
    return state.map(p => entries(p, action));
  }

  return state;
}

export default days;

// const testAddEntry = () => {
//   const stateBefore = [{
//     pageId: 0,
//     date: 'monday',
//     entries: [],
//   }];
//   const action = {
//     type: 'ADD_ENTRY',
//     pageId: 0,
//     entry: 'poop',
//   };
//   const stateAfter = [
//     {
//       pageId: 0,
//       date: 'monday',
//       entries: ['poop'],
//     },
//   ];
//
//   deepFreeze(stateBefore);
//   deepFreeze(action);
//
//   expect(
//     days(stateBefore, action),
//   ).toEqual(stateAfter);
//
//   const stateBeforeAddTwo = stateAfter;
//   const actionAddTwo = {
//     type: 'ADD_ENTRY',
//     pageId: 0,
//     entry: 'pee',
//   };
//   const stateAfterAddTwo = [
//     {
//       pageId: 0,
//       date: 'monday',
//       entries: ['poop', 'pee'],
//     },
//   ];
//
//   deepFreeze(stateBeforeAddTwo);
//   deepFreeze(actionAddTwo);
//
//   expect(
//     days(stateBeforeAddTwo, actionAddTwo),
//   ).toEqual(stateAfterAddTwo);
// };
//
// testAddEntry();
// console.log('tests passed');

// const testAddPage = () => {
//   const stateBefore = [];
//   const action = {
//     type: 'ADD_PAGE',
//     pageId: 0,
//     date: 'monday',
//   };
//   const stateAfter = [
//     {
//       pageId: 0,
//       date: 'monday',
//       entries: [],
//     },
//   ];
//
//   deepFreeze(stateBefore);
//   deepFreeze(action);
//
//   expect(
//     days(stateBefore, action),
//   ).toEqual(stateAfter);
// };
//
// testAddPage();
// console.log('tests passed');
