import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';

import { EventAvailable, Group, GroupAddOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    border: '1px solid lightgray',

    backgroundColor: theme.palette.background.paper,
  },

  listtext: {
    color: 'red',
  },
}));

export default function EventBox() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <EventAvailable className={classes.listtext} />
          </ListItemIcon>
          <ListItemText primary="All upcoming Events" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Group className={classes.listtext} />
          </ListItemIcon>
          <ListItemText primary="Your Groups and Suggestions" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <GroupAddOutlined className={classes.listtext} />
          </ListItemIcon>
          <ListItemText primary="RSVP Events" />
        </ListItem>
      </List>
    </div>
  );
}
