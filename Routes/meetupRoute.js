const express = require('express');
const {
  createMeetup,
  getOneMeetup,
  updateMeetup,
  getAllMeetups,
  deleteAllMeetups,
  deleteOneMeetup,
} = require('../Controllers/meetupController');

const router = express.Router();

router
  .route('/')
  .post(createMeetup)
  .get(getAllMeetups)
  .delete(deleteAllMeetups);
router
  .route('/:id')
  .get(getOneMeetup)
  .patch(updateMeetup)
  .delete(deleteOneMeetup);

module.exports = router;
