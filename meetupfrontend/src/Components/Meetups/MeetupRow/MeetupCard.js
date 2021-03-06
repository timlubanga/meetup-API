import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MeetupActionPhotos from './meetupPhotoAction';

const useStyles = makeStyles({
  root: {
    width: 280,
    scrollBehavior: 'smooth',
    transition: ' all ease-out 0.3s ',
    '&:hover': {
      transform: 'scale(1.04)',
    }

    
  },

  media: {
    height: 180,
  },
});

function MeetupCard({ cardTitle, imageName }) {
  const classes = useStyles();
  console.log(classes)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`/meetup-photos/${imageName}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="left">
            {cardTitle}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="left"
          >
            Due to covid-19 pandemic, most meetups are conducted online,
            especially the zoom meeting
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MeetupActionPhotos />
      </CardActions>
    </Card>
  );
}


export default React.memo(MeetupCard)