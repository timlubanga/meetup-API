import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Apple,
  PlayArrow,
} from '@material-ui/icons';
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: '500px',
      width: '100%',
      backgroundColor: '#262626',
      marginTop: '200px',
      paddingBottom:"80px"
    },
    socialNetwork: {
      marginLeft: '15px',
      fontSize: '40px',
    },
  };
});

const Footer = (props) => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid
          item
          container
          style={{
            marginTop: '30px',
          }}
          xs={10}
        >
          <Grid
            item
            container
            xs={12}
            justify="flex-start"
            style={{
              borderBottom: '1px solid white',
              marginBottom: '10px',
              paddingBottom: '30px',
            }}
          >
            <Typography
              variant="h5"
              style={{ color: 'white', fontWeight: 900 }}
            >
              Create your Own Meetup Group.
            </Typography>
            <Button
              color="secondary"
              style={{
                color: 'white',
                border: '3px solid white',
                borderRadius: '5px',
                marginLeft: '8px',
              }}
            >
              Get started
            </Button>
          </Grid>
          <Grid item container>
            <Grid item xs={4} style={{ color: 'white' }}>
              <List>
                <ListItem>
                  <ListItemText primary="Your Account"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sign up"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Login"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Help"></ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4} style={{ color: 'white' }}>
              <List>
                <ListItem>
                  <ListItemText primary="Discover"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Groups"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Calenders"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Topics"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Cities"></ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4} style={{ color: 'white' }}>
              <List>
                <ListItem>
                  <ListItemText primary="Meetup"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Blog"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Meetup Pro"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Careers"></ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText primary="Apps"></ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item container style={{ color: 'white' }}>
            <Grid
              item
              container
              md={6}
              xs={12}
              spacing={4}
              direction="column"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h5"> Follow us</Typography>
              </Grid>
              <Grid item container>
                <Facebook className={classes.socialNetwork} />
                <Instagram className={classes.socialNetwork} />
                <Twitter className={classes.socialNetwork} />
                <YouTube className={classes.socialNetwork} />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item>
                  <Typography>2020 Meetup</Typography>
                </Grid>
                <Grid item>
                  <Typography>Terms of Service</Typography>
                </Grid>
                <Grid item>
                  <Typography>Privavy Police</Typography>
                </Grid>
                <Grid item>
                  <Typography>Cookie Policy</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              md={6}
              justify="flex-end"
              alignItems="flex-start"
              spacing={4}
              xs={12}
            >
              <Grid item>
                <Button
                  startIcon={<PlayArrow />}
                  variant="outlined"
                  style={{ color: 'white', border: '1px solid white' }}
                >
                  Google Play
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<Apple />}
                  variant="outlined"
                  style={{ color: 'white', border: '1px solid white' }}
                >
                  {' '}
                  AppStore
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
