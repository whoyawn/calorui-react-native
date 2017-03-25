/**
 * Created by huyanh on 2017. 3. 20..
 */
import type { Action } from '../actions/types';

// Inner list
export type Entries = Array<Entry>;
export type Entry = {
  title: string,
  amount: number,
}
const initialState = [];

// Update individual day
function entries(state: Entries = initialState, action: Action): State {
  if (action.type === 'ADD_ENTRY') {
    if (state.pageId !== action.pageId)
      return state;
    return {
      ...state,
      entries: [...state.entries, action.entry],
    };
  }
  return state;
}

export default entries;
