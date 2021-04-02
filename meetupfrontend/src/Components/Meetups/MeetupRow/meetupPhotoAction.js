import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  recommend_photo: {
    borderRadius: '50%',
    height: '1.65rem',
    width: '1.65rem',
    marginLeft: '-1rem',
    border: '0.5rem solid white',
  },
  recommend_friends: {
    display: 'flex',
    alignItems: 'center',
  },

  total: {
    fontWeight: 300,
    color: 'gray',
    marginRight: '30px',
  },
});

const MeetupActionPhotos = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.recommend_friends}>
      <img
        src="/meetup-photos/user-4.jpg"
        alt="Friend 2"
        className={classes.recommend_photo}
      />
      <img
        src="/meetup-photos/user-5.jpg"
        alt="Friend 3"
        className={classes.recommend_photo}
      />
      <img
        src="/meetup-photos/user-6.jpg"
        alt="Friend 4"
        className={classes.recommend_photo}
      />
      <h3 className={classes.total}>0</h3>
    </div>
  );
};

export default MeetupActionPhotos;
