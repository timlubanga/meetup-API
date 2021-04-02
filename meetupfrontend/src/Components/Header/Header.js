import React from 'react';
import './header.css';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Search from '../Search/Search';

const useStyles = makeStyles((theme) => {
  return {
   
    //   header:{
    // [theme.breakpoints.down("sm")]:{
    //   fontSize:"32px",
    //   fontWeight:0.78

    // },
    //   },

    Illustrate: {
      width: '80%',
    },
  };
});

const Header = (props) => {
  const classes = useStyles();
  return (
    <header className={'header'}>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          alignItems="flex-start"
          xs={12}
          sm={6}
        >
          <h1 className={'heading'}>
            Discover Events For All the Things You Love
          </h1>
          <Button variant="contained" color="secondary">
            Join Meetup
          </Button>
        </Grid>

        <Grid item xs={8} sm={6}>
          <img
            className={classes.Illustrate}
            src="/illustration.svg"
            alt="illistration"
          ></img>
        </Grid>
      </Grid>

      <Search />
    </header>
  );
};

export default Header;
