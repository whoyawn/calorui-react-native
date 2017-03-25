/**
 * Created by huyanh on 2017. 3. 20..
 */
export type Action =
  { type: 'ADD_PAGE', pageId: string, date: string }
| { type: 'ADD_ENTRY', pageId: string, entries: Array<{ name: string, amount: number }>}
;
