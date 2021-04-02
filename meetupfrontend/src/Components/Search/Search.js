import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Event, PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: '60px',
  },
  container: {
    padding: '10px',
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Paper elevation={4}>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          className={classes.container}
          spacing={4}
        >
          <Grid item container md={4} xs={12} spacing={2}>
            <Grid item container xs={2} alignItems="center" justify="flex-end">
              <Event color="secondary" />
            </Grid>
            <Grid item container xs={10}>
              <TextField
                variant="outlined"
                id="input-with-icon-grid"
                color="secondary"
                label="Find your next event"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid item container md={4} xs={12} spacing={2}>
            <Grid item container xs={2} justify="flex-end" alignItems="center">
              <PinDropSharp color="secondary" />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="location"
                color="secondary"
                variant="outlined"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify={'center'}
            md={4}
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item container justify="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                style={{ textTransform: 'none', width: '50%' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
