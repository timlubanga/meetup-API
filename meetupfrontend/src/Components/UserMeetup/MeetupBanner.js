import React from 'react';
import { makeStyles } from '@material-ui/styles';

const usestyles = makeStyles({
  topRoot: {
    backgroundColor: '#00455d',
    width:"100%",
    height: '200px',
  },
});

const UserMeetup = (props) => {
  const classes = usestyles();
  return (
    <div>
      <div className={classes.topRoot}></div>
    </div>
  );
};

export default UserMeetup;
