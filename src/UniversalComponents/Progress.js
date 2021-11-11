import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop } from '@mui/material';

export default function Progress () {
  const { isInprogress } = useSelector(state => {
    return state.Progress;
  });

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isInprogress}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
