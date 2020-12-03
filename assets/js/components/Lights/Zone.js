import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonGroup, Card, CardActions, CardContent, Collapse, FormControl, FormGroup, Grid, IconButton, Slider, Switch, Typography} from '@material-ui/core';
import clsx from 'clsx';
import BrightnessIcon from '@material-ui/icons/BrightnessMedium';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiFormGroup-root': {
      margin: theme.spacing(1),
    },
  }
}));

export default function Zone(props){
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = (e, f) => {
    setExpanded(!expanded);
  };

  let fixture = props.fixture;

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions disableSpacing>
        <Switch
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          checked={fixture.on}
          disabled={fixture.reachable}
          onClick={() => props.onFixtureZoneUpdate(fixture.id, "toggle")}
        />
        <Typography type="title" color="inherit" style={{marginRight: 'auto'}}>
          {fixture.name}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <FormGroup>
            <FormControl className={classes.formControl}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <BrightnessIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={fixture.brightness}
                    aria-labelledby="disabled-slider"
                    min={0}
                    max={255}
                    onChange={(_, value) => props.onFixtureZoneUpdate(fixture.id, "brightness", value)}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ButtonGroup
              variant="contained"
              color="secondary"
              key={fixture.id}
            >
              <Button onClick={() => props.onFixtureZoneUpdate(fixture.id, "color", [0.5248, 0.4135])}>Warm</Button>
              <Button onClick={() => props.onFixtureZoneUpdate(fixture.id, "color", [0.3132, 0.3288])}>Cold</Button>
              <Button onClick={() => props.onFixtureZoneUpdate(fixture.id, "brightness", 30)}>Dim</Button>
              <Button onClick={() => props.onFixtureZoneUpdate(fixture.id, "brightness", 255)}>Full</Button>
            </ButtonGroup>
          </FormGroup>
        </CardContent>
      </Collapse>
    </Card>
  )
}
