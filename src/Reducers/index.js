import { combineReducers } from 'redux';
import Absent from './Absent';
import Notification from './Notification';
import Progress from './Progress';
import Reference from './Reference';
import Products from './Products';

export default combineReducers({
  Absent, Notification, Progress, Reference, Products
});
