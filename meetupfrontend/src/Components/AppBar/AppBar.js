import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Logo from '../Logo/Logo';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Popover from '../Popover/Popover';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useContext(UserContext);

  const handleLinkRedirect = (link) => {
    history.push(`/${link}`);
  };

  const firstname = state.data.firstname ? state.data.firstname : null;
  const lastname = state.data.lastname ? state.data.lastname : null;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Logo link={handleLinkRedirect} />

          {state.token && <Popover first={firstname} last={lastname} />}
          {state.token ? null : (
            <>
              <Button
                color="inherit"
                className={classes.buttonText}
                onClick={() => handleLinkRedirect('login')}
              >
                Login
              </Button>

              <Button
                color="inherit"
                className={classes.buttonText}
                onClick={() => handleLinkRedirect('signup')}
              >
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
