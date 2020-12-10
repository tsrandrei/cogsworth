import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, FormGroup, InputLabel , Select, MenuItem, InputAdornment, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
  "& .MuiFormGroup-root": {
    margin: theme.spacing(2),
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    
  },
}));

export default function DisperserSettings(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.data.name}
        component="h2"
        titleTypographyProps={{align: "center"}}
      />
      <CardContent>
        <FormGroup>
          <FormControl>
            <TextField
              id="amount-maggie"
              label="Amount to fill (A)"
              type="number"
              variant="outlined"
              value={props.data.weightToFillA}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>
              }}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField
              id="amount-vapula"
              label="Amount to fill (B)"
              type="number"
              variant="outlined"
              value={props.data.weightToFillB}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>
              }}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel id="fill-strategy-label">Fill Strategy</InputLabel>
            <Select
              labelId="fill-strategy-label"
              id="fill-strategy"
              label="Fill strategy"
              value={props.data.fillStrategy}
            >
              <MenuItem value={"once_a_day"}>Once a day</MenuItem>
              <MenuItem value={"up_to_amount"}>Fill up to amount</MenuItem>
              <MenuItem value={"if_empty"}>Fill only if empty</MenuItem>
              <MenuItem value={"half_unless_empty"}>Fill up half if not empty</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField
              id="time"
              label="Fill schedule"
              type="time"
              value={props.data.fillSchedule}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </FormControl>
        </FormGroup>
      </CardContent>
      <CardContent>
        <FormGroup>
          <Typography variant="h2" align="center" gutterBottom>Manual release</Typography>
          <br />
          <FormControl>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button>Both</Button>
              <Button>Maggie</Button>
              <Button>Vapula</Button>
            </ButtonGroup>
          </FormControl>
        </FormGroup>
      </CardContent>
    </Card>
  )
}
