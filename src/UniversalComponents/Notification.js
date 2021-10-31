import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export default function Notification () {
  const dispatch = useDispatch();
  const handleOnClose = (event, reason) => {
    const action = { type: 'CLOSE_NOTIFICATION' };
    dispatch(action);
  };

  const { isOpen, message, type } = useSelector(state => {
    return state.Notification;
  });

  return (
    <Snackbar
      open={isOpen}
      onClose={handleOnClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={type} onClose={handleOnClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
