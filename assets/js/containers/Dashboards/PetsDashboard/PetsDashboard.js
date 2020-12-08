import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import DispenserSettings from '../../../components/Pets/DispenserSettings/DispenserSettings';
import PetFeederImage from '../../../../../assets/static/images/pet-feeder.png';

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
        <Grid item xs={12} sm={4}>
          <Card className={classes.paper}>
            <CardContent>
              <DispenserSettings title="Food" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.paper}>
            <CardHeader
              title="State"
              component="h3"
              titleTypographyProps={
                {align: "center"}
              }
            />
            <CardMedia>
              <img src={PetFeederImage} />
            </CardMedia>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>Vapula: 12.88</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>Maggie: 12.88</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.paper}>
            <CardContent>
              <DispenserSettings title="Treats" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
}
