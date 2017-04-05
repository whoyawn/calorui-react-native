/**
 * Created by huyanh on 2017. 3. 20..
 */
export type Action =
  { type: 'ADD_PAGE', key: string, date: string }
| { type: 'ADD_ENTRY', key: string, entry: { key: string, title: string, amount: number } }
| { type: 'REMOVE_ENTRY', key: string, entryKey: string }
;
