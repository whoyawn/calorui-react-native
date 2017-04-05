/**
 * Created by huyanh on 2017. 3. 20..
 * @flow
 */

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
