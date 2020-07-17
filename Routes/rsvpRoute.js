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

const { protect } = require('../Controllers/authController');

const express = require('express');

const router = express.Router({ mergeParams: true });
router.use(protect);
router.route('/').post(createRSVP, displayRSVP).get(getAllRSVP);
router.get('/getscheduledUsermeeutups', getupcomingMeetingsForAuser);

//get rsvps by meetup id

module.exports = router;
