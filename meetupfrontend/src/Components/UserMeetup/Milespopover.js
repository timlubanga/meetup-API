import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import './UserMeetup.css';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  },

  highlighted: {
    backgroundColor: 'blue',
    color: 'white',
  },
  popover: {
    cursor: 'pointer',
  },
}));

export default function SimplePopover(styled) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [miles, setMiles] = React.useState(50);

  const handleMiles = (option) => {
    setMiles(option);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <span className="spanned" aria-describedby={id} onClick={handleClick}>
        {isNaN(miles) ? `within ${miles}` : ` within ${miles} miles`}
      </span>

      <Popover
        className={classes.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {[20, 35, 50, 85, 'Any distance'].map((distance) => {
          return (
            <Typography key={distance}
              className={clsx(classes.typography, {
                [classes.highlighted]: miles === distance,
              })}
              onClick={() => handleMiles(distance)}
            >
              {distance} {!isNaN(distance) && 'miles'}
            </Typography>
          );
        })}
      </Popover>
    </>
  );
}
