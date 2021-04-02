import React, { useState, useEffect } from 'react';
import MeetupRow from './MeetupRow/MeetupRow';

import axios from '../../axios';

const Meetups = (props) => {
  const [meetups, setmeetups] = useState([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const fethdata = async () => {
      setloaded(false);
      const data = await axios.get('/meetup');
      setmeetups(data.data.docs);
      setloaded(true);
    };

    fethdata();
  }, []);

  return (
    <div>
      {loaded && (
        <div>
          <MeetupRow title={'careers & Business'} meetupData={meetups} />
          <MeetupRow title={'outdoor and adventure'} meetupData={meetups} />
          <MeetupRow title={'health and wellness'} meetupData={meetups} />
          <MeetupRow title={'technology & engineering'} meetupData={meetups} />
          <MeetupRow title={'learning'} meetupData={meetups} />
        </div>
      )}
    </div>
  );
};

export default Meetups;
