/**
 * Created by huyanh on 2017. 3. 20..
 * @flow
 */
import type { Action } from '../actions/types';
import type { Page } from './days';
// Inner list
export type Entries = Array<Entry>;
export type Entry = {
  key: string,
  title: string,
  amount: number,
}

// Update individual day
function entries(state: Page, action: Action): Page {
  switch (action.type) {
    case 'ADD_ENTRY':
      if (state.key !== action.key) { return state; }
      return {
        ...state,
        entries: [...state.entries, action.entry],
      };
    case 'REMOVE_ENTRY':
      if (state.key !== action.key) { return state; }
      return {
        ...state,
        entries: state.entries.filter(e => e.key !== action.entryKey),
      };
    default:
      return state;
  }
}


export default entries;
