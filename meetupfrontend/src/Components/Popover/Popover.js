import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Avatar from '../AppBar/Avatar/Avatar';
import { Divider } from '@material-ui/core';
import Logout from '../Logout/Logout';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
}));

export default function SimplePopover({ first, last }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Popover
      </Button> */}
      <Avatar
        id={id}
        handleClick={handleClick}
        first={first}
        last={last}
      ></Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Go to Profile</Typography>
        <Divider />
        <Logout style={classes.typography} />
      </Popover>
    </div>
  );
}
