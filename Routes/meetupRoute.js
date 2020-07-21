const express = require('express');
const RSVPRouter = require('../Routes/rsvpRoute');
const {
  createMeetup,
  getOneMeetup,
  updateMeetup,
  getAllMeetups,
  deleteAllMeetups,
  deleteOneMeetup,
  getupcomingMeetings,
  handleFilewithMulter,
  resizephotos,
  updatePhotosOnly,
} = require('../Controllers/meetupController');
const questionRouter = require('../Routes/questionRoute');

const router = express.Router();

router.get('/upcoming', getupcomingMeetings);

router
  .route('/')
  .post(handleFilewithMulter, resizephotos, createMeetup)
  .get(getAllMeetups)
  .delete(deleteAllMeetups);
router
  .route('/:meetupid')
  .get(getOneMeetup)
  .patch(handleFilewithMulter, resizephotos, updatePhotosOnly, updateMeetup)
  .delete(deleteOneMeetup);
router.use('/:meetupid/question', questionRouter);
router.use('/:meetupid/rsvp', RSVPRouter);
module.exports = router;
