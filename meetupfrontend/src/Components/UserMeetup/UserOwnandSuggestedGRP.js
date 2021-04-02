import React, { useEffect, useState, useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Card from './Card';
import axios from '../../axios';
import { UserContext } from '../../App';
import CardList from './Card';
const useStyles = makeStyles({
  rootgrp: {
    fontWeight: 900,
    padding: '20px 0',
    textAlign: 'left',
  },

  transform: {
    transition: 'all 0.2s ease-out',
    '&:hover :not(:hover)': {
      transform: 'scale(0.98)',
    },

    // '&:hover *:not(:hover)': {
    //   transfrom: 'scale(0.90)',
    // },
  },
});
const OwnandSuggested = ({ headingOption, fetchUrl }) => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  const { token } = state;
  const [error, setError] = useState(false);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios({
            method: 'get',
            url: fetchUrl,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (isMounted) setData(response.data);
        } catch (error) {
          if (isMounted) setError(true);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [headingOption, token]);
  const classes = useStyles();
  console.log(data);
  // console.log(token)
  // console.log(fetchUrl)
  return (
    <div style={{ marginBottom: '10px' }}>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.rootgrp} variant="h6">
            {headingOption}
          </Typography>
        </Grid>
        <Grid item container spacing={1} className={classes.transform}>
          <CardList list={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(OwnandSuggested);
