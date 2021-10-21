import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';

export default function Progress () {
  const { isInprogress } = useSelector(state => {
    return state.Progress;
  });
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  }));
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isInprogress}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
