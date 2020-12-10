import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DispenserSettings from '../../../components/Pets/DispenserSettings/DispenserSettings';
import Spinner from '../../../components/Spinner/Spinner';
import PetFeederImage from '../../../../../assets/static/images/pet-feeder.png';
import { useQuery, gql } from '@apollo/client';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SETTINGS = gql`
  query{
    settings{
      name
      fillSchedule
      fillStrategy
      weightToFillA
      weightToFillB
    }
    currentWeightA
    currentWeightB
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  feederImage: {
    width: '100%'
  }
}));

export default function PetsDashboard() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(SETTINGS);
  let food_setting_a = {};
  let food_setting_b = {};
  let errorMessage = error ? <Alert severity="error">Something went wrong!</Alert> : null;

  if (loading || error) {
    food_setting_a = <Spinner />
    food_setting_b = <Spinner />
  } else {
    food_setting_a = <DispenserSettings data={data.settings[0]} />
    food_setting_b = <DispenserSettings data={data.settings[1]} />
  }
  
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={4}>
        {food_setting_a}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader
            title="State"
            component="h2"
            titleTypographyProps={
              {align: "center"}
            }
          />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                {errorMessage}
                <img src={PetFeederImage} className={classes.feederImage} />
              </Grid>
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
        {food_setting_b}
      </Grid>
    </Grid>
  );
}
