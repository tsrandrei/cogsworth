import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Paper className={classes.fixedHeight}>
      <Chart />
    </Paper>
  );
}
