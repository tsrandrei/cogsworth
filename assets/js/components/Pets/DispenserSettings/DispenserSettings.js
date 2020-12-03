import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, InputLabel , Select, MenuItem, FormControl, InputAdornment, TextField, Typography } from '@material-ui/core';

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

export default function DisperserSettings(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>{props.title}</Typography>
      <form className={classes.container} noValidate>
        <div>
          <TextField
            id="amount-maggie"
            label="Amount to fill"
            defaultValue="10g"
            helperText="Maggie"
            variant="outlined"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>
            }}
          />
        </div>
        <div>
          <TextField
            id="amount-vapula"
            label="Amount to fill"
            defaultValue="10g"
            helperText="Vapula"
            variant="outlined"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>
            }}
          />
        </div>
        <div>
          <InputLabel id="fill-strategy-label">Fill Strategy</InputLabel>
          <Select
            labelId="fill-strategy-label"
            id="fill-strategy"
            label="Fill strategy"
          >
            <MenuItem value={"up-to-amount"}>Fill up to amount</MenuItem>
            <MenuItem value={"if-empty"}>Fill only if empty</MenuItem>
            <MenuItem value={"half-unless-empty"}>Fill up half if not empty</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            id="time"
            label="Fill schedule"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
        <div>
          <Typography variant="h3" gutterBottom>Manual fill</Typography>
          <br />
          <FormControl>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button>Both</Button>
              <Button>Maggie</Button>
              <Button>Vapula</Button>
            </ButtonGroup>
          </FormControl>
        </div>
      </form>
    </React.Fragment>
  )
}
