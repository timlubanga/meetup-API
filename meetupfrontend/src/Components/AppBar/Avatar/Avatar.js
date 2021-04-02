import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  para: {
    color: 'gray',
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}));

const initialGenerate = (first, second) => {
  console.log(first)
  if (!first || !second) return "TL"
  const firstLetter = first.split('')[0];
  const lastLetter = second.split('')[0];
  return [firstLetter, lastLetter].join('').toUpperCase();
};
export default function LetterAvatars({ first, last, id, handleClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.para}>Welcome,</p>
      <Avatar className={classes.red} onClick={handleClick}  aria-describedby={id}>{initialGenerate(first, last)}</Avatar>
    </div>
  );
}
