import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import DispenserSettings from '../../../components/Pets/DispenserSettings/DispenserSettings';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function PetsDashboard() {
  const classes = useStyles();

  return (
      <Grid container>
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>State</Typography>
            Maggie food Weight: 12.88
            Vapula food Weight: 12.88
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className={classes.paper}>
            <CardContent>
              <DispenserSettings title="Food" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className={classes.paper}>
            <CardContent>
              <DispenserSettings title="Treats" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
}
