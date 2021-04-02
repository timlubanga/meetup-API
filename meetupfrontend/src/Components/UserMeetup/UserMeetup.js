import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Milespopover from './Milespopover';
import UserGroup from './UserGroup';
import UserOwnandSuggestedGRP from './UserOwnandSuggestedGRP';
import { fetchUpcomingEvents, fetchUserbookedMeetups } from '../../urls';
const useStyles = makeStyles({
  root: {
    margin: '0 10px',
  },
  rootTop: {
    backgroundColor: 'black',
    width: '100%',
    minHeight: '100px',
    zIndex: 12,
    marginTop: '-50px',
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    top: '1px',
    color: 'white',
  },
  groupbackground: {
    backgroundColor: 'gray',
  },
  input: {
    backgroundColor: 'white',
    border: '1px solid white',
    color: 'white',
  },

  'input:focus': {
    border: 'none',
    outline: 'none',
  },
  group: {
    border: '1px solid gray',
    height: '85%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function BasicTextField() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="filled"
        className={classes.input}
      />
    </form>
  );
}

const UserMeetup = (props) => {
  const classes = useStyles();
  const [group, setGroup] = useState(true);
  const [calender, setcalender] = useState(false);

  const handleClick = (type) => {
    if (type === 'group') {
      setcalender(false);
      setGroup(true);
    } else if (type === 'calender') {
      setcalender(true);
      setGroup(false);
    }
  };

  return (
    <div>
      <div className={classes.rootTop}>
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <BasicTextField />
          </Grid>
          <Grid item container alignItems="center" xs={12} md={6} lg={5}>
            <Typography variant="h6" align="center">
              Find events <Milespopover styled={classes.spanned} /> in Nairobi,
              Ke
            </Typography>
          </Grid>
          <Grid item container xs={12} md={6} lg={3}>
            <Grid item xs={12} md={6}>
              <div
                onClick={() => {
                  handleClick('group');
                }}
                className={clsx(classes.group, {
                  [classes.groupbackground]: group,
                })}
              >
                <Typography variant="h6" align="center">
                  Group
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                onClick={() => {
                  handleClick('calender');
                }}
                className={clsx(classes.group, {
                  [classes.groupbackground]: calender,
                })}
              >
                <Typography variant="h6" align="center">
                  Calender
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {calender && <UserGroup />}
      {group && (
        <>
          <UserOwnandSuggestedGRP
            headingOption="Your Groups"
            fetchUrl={fetchUserbookedMeetups}
          />
          <UserOwnandSuggestedGRP
            headingOption="Suggested and Recommended Groups"
            fetchUrl={fetchUpcomingEvents}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(UserMeetup);
