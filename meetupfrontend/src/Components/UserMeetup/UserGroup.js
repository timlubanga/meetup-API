import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import EventBox from './EventBox';
import GroupCalendar from './Calender';

const useStyles = makeStyles({
  rootGroup: {
    marginTop: '25px',
    boxSizing: 'border-box',
  },
  groupDetails: {
    border: '1px solid lightgray',
    display: 'flex',
    padding: '20px',
  },
});

const UserGroup = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.rootGroup}>
      <Grid container spacing={2}>
        <Grid item container direction="column" md={8}>
          <Grid item>
            <Typography variant="h6" align="left">
              21st September 2021
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.groupDetails}>
              <Grid item xs={2}>
                <Typography>1.00PM</Typography>
              </Grid>
              <Grid item container xs={10}>
                <Grid item>
                  <Typography>TOASTMASTERS IN NAIROBI</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    Improve Communication and Leadership Skills at WBG
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">5 Toastmasters going</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid
          item
          container
          alignItems="flex-end"
          direction="column"
          spacing={3}
          md={4}
        >
          <Grid item>
            <EventBox />
          </Grid>

          <Grid item>
            <GroupCalendar />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserGroup;
