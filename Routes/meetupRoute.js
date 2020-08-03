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
const { authorize, protect } = require('../Controllers/authController');

const router = express.Router();

router.get('/upcoming', getupcomingMeetings);

router
  .route('/')
  .post(
    protect,
    authorize('admin'),
    handleFilewithMulter,
    resizephotos,
    createMeetup
  )
  .get(getAllMeetups)
  .delete(protect, authorize('admin'), deleteAllMeetups);
router
  .route('/:meetupid')
  .get(protect, getOneMeetup)
  .patch(
    protect,
    authorize('authorize'),
    handleFilewithMulter,
    resizephotos,
    updatePhotosOnly,
    updateMeetup
  )
  .delete(protect, authorize('admin'), deleteOneMeetup);
router.use('/:meetupid/question', questionRouter);
router.use('/:meetupid/rsvp', RSVPRouter);
module.exports = router;
