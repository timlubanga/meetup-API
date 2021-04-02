import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import './card.css';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    transition: 'all 0.2s ease-out',
  },

  cardTitle: {
    color: 'white',
    fontWeight: 900,
    textAlign: 'center',
  },

  address: {
    color: ' #bf8040',
  },
});
const Card = ({ imagebg, title, address }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4} className={classes.root}>
      <div
        className={clsx(['card'])}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65), 
          rgba(0,0,0,0.65)), url(/meetup-photos/${imagebg})`,
        }}
      >
        <Typography variant="h5" className={classes.cardTitle}>
          {title}
        </Typography>
        <Typography variant="h6" className={classes.address}>
          {address}
        </Typography>
      </div>
    </Grid>
  );
};

const CardList = ({ list }) => {
  const [cardList, setCardList] = useState([]);
  const [cardSpinner, setCardSpinner] = useState(true);

  useEffect(() => {
    let isLoaded = list.length !== 0;
    const timerfn = () => {
      isLoaded = list.length !== 0;
      if (isLoaded) return;
      setCardSpinner(false);
    };
    let timer;
    if (!isLoaded) {
      timer = setTimeout(timerfn, 5000);
    } else {
      setCardList(list);
      setCardSpinner(false);
    }

    return () => clearTimeout(timer);
  }, [list]);

  const CardListFunc = useMemo(() => {
    if (!(cardList.length ===0)) {
      return cardList.map((card) => {
        return (
          <Card
            key={card._id}
            imagebg={card.images[0]}
            title={card.topic}
            address={card.location.address}
          />
        );
      });
    }
  }, [cardList]);

  return (
    <>
      {cardSpinner && <Spinner />}
      {!cardList.length && !cardSpinner && (
        <div
          style={{
            textAlign: 'center',
            backgroundColor: '#595854',
            fontSize: '20px',
            fontWeight: 700,
            color: 'white',
            padding: '50px',
            width: '100%',
            height: '100px',
          }}
        >
          User has no meetups yet.
        </div>
      )}
      {CardListFunc}
    </>
  );
};
export default React.memo(CardList);
