const ProgressReducers = (state = false, action) => {
  switch (action.type) {
  case 'IN_PROGRESS' :
    return { isInprogress: true };
  case 'IN_PROGRESS_DONE' :
    return { isInprogress: false };
  default:
    return { isInprogress: false };
  }
};
export default ProgressReducers;
