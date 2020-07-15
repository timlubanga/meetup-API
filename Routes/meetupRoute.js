const express = require('express');
const RSVPRouter = require('../Routes/rsvpRoute');
const {
  createMeetup,
  getOneMeetup,
  updateMeetup,
  getAllMeetups,
  deleteAllMeetups,
  deleteOneMeetup,
} = require('../Controllers/meetupController');
const questionRouter = require('../Routes/questionRoute');

const router = express.Router();

router
  .route('/')
  .post(createMeetup)
  .get(getAllMeetups)
  .delete(deleteAllMeetups);
router
  .route('/:meetupid')
  .get(getOneMeetup)
  .patch(updateMeetup)
  .delete(deleteOneMeetup);
router.use('/:meetupid/question', questionRouter);
router.use('/:meetupid/rsvp', RSVPRouter);
module.exports = router;
