const {
  createRSVP,
  getAllRSVP,
  getoneRSVP,
  deleteALLRSVP,
  deleteOneRSVP,
  updateRSVP,
  displayRSVP,
  getupcomingMeetingsForAuser,
} = require('../Controllers/RsvpController');

const { protect, authorize } = require('../Controllers/authController');

const express = require('express');
const { CheckifTheIdisValid } = require('../Controllers/factoryController');
const Meetup = require('../Models/meetupModel');

const router = express.Router({ mergeParams: true });
router.use(protect);
router
  .route('/')
  .post(
    authorize('user'),
    CheckifTheIdisValid(Meetup, 'meetupid'),
    createRSVP,
    displayRSVP
  )
  .get(authorize('admin'), getAllRSVP);
router.get(
  '/getscheduledUsermeeutups',
  authorize('user'),
  getupcomingMeetingsForAuser
);

//get rsvps by meetup id

module.exports = router;
