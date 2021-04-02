import React, { useEffect, useState } from 'react';
import { Grid, Typography} from '@material-ui/core';
import MeetupCard from './MeetupCard';
import { makeStyles } from '@material-ui/styles';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: '60px',
  },

  itemoverflow: {
    overflowX: 'hidden',
    position: 'relative',
    transition: 'all ease-in-out 0.5s ',
  },
  Typography: {
    fontWeight: 900,
    letterSpacing: '-0.82px',
    fontSize: '35px',
  },
  Iconbutton: {
    position: 'absolute',
    top: '50%',
    right: '0',
    color: 'green',
    border: ' 1px solid gray',
  },

  Iconbuttonback: {
    position: 'absolute',
    top: '50%',
    left: '-1px',
    color: 'green',
    border: ' 1px solid gray',
  },
});

const MeeetupRow = ({ title, meetupData }) => {
  const [data, setData] = useState([]);
  const [stateIndex, setStateIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(4);
  const [hidefront, sethidefront] = useState(false);
  const [hideback, sethideback] = useState(true);

  useEffect(() => {
    const newarr = [];
    meetupData.forEach((meetup) => {
      if (meetup.category === title) {
        newarr.push(meetup);
      }
    });
    setData(newarr);

    if (newarr.length === stopIndex) {
      sethidefront(true);
      sethideback(true);
    }
  }, [title]);

  const handleIncrement = () => {
    let maxIndex = data.length;
    if (stopIndex < maxIndex) {
      setStateIndex((prevState) => prevState + 1);
      setStopIndex((prevState) => prevState + 1);
      sethidefront(false);
    } else {
      sethidefront(true);
      sethideback(false);
    }
  };

  const handleDecreament = () => {
    if (stateIndex > 0) {
      setStateIndex((prevState) => prevState - 1);
      setStopIndex((prevState) => prevState - 1);
      sethideback(false);
    } else {
      sethideback(true);
      sethidefront(false);
    }
  };
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={4}>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography className={classes.Typography} variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>See All</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          wrap="nowrap"
          className={classes.itemoverflow}
        >
          {!hidefront && (
            <IconButton
              size="small"
              className={classes.Iconbutton}
              onClick={handleIncrement}
            >
              <ArrowForward />
            </IconButton>
          )}
          {!hideback && (
            <IconButton
              size="small"
              className={classes.Iconbuttonback}
              onClick={handleDecreament}
            >
              <ArrowBack />
            </IconButton>
          )}
          {data.slice(stateIndex, stopIndex).map((el) => {
            return (
              <Grid item key={el._id}>
                <MeetupCard imageName={el.images[0]} cardTitle={el.topic} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default MeeetupRow;
