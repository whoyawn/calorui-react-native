/**
 * Created by huyanh on 2017. 3. 20..
 */
import type { Action } from '../actions/types';

// Inner list
export type Entries = Array<Entry>;
export type Entry = {
  key: string,
  title: string,
  amount: number,
}
const initialState = [];

// Update individual day
function entries(state: Entries = initialState, action: Action): Entries {
  if (action.type === 'ADD_ENTRY') {
    if (state.key !== action.key)
      return state;
    return {
      ...state,
      entries: [...state.entries, action.entry],
    };
  }
  return state;
}

export default entries;
