import { combineReducers } from 'redux';
import Notification from './Notification';
import Progress from './Progress';
import Login from './Login';

export default combineReducers({
  Notification, Progress, Login
});
