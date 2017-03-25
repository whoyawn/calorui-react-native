/**
 * Created by huyanh on 2017. 3. 20..
 */
import { combineReducers } from 'redux';
import days from './days';

export default combineReducers({
  log: days,
});
