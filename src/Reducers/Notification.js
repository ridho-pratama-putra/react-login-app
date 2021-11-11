const NotificationReducers = (state = [], action) => {
  switch (action.type) {
  case 'NOTIFICATION_SUCCESS' :
    return { isOpen: true, message: action.message, type: 'success' };
  case 'NOTIFICATION_FAILED' :
    return { isOpen: true, message: action.message, type: 'error' };
  case 'CLOSE_NOTIFICATION' :
    return { isOpen: false };
  case 'NOTIFICATION_TIMEOUT' :
    return { isOpen: true, message: 'Backend down', type: 'error' };
  default:
    return state;
  }
};
 export default NotificationReducers;
