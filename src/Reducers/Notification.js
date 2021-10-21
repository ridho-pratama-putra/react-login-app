export default (state = [], action) => {
  switch (action.type) {
  case 'NOTIFICATION_SUCCESS' :
    return { isOpen: true, message: action.message, type: action.notificationType };
  case 'NOTIFICATION_FAILED' :
    return { isOpen: true, message: action.message, type: action.notificationType };
  case 'CLOSE_NOTIFICATION' :
    return { isOpen: false };
  case 'NOTIFICATION_TIMEOUT' :
    return { isOpen: true, message: action.message, type: action.notificationType };
  default:
    return state;
  }
};
