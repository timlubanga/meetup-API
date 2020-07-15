const {
  createDoc,
  getOneRecord,
  getAllRecords,
  updateRecord,
  deleteAllRecords,
  deleteOneRecord,
} = require('../Controllers/factoryController');

const RSVP = require('../Models/rsvpModel');
const Meetup = require('../Models/meetupModel');
const AppError = require('../utils/appError');

exports.createRSVP = createDoc(RSVP);
exports.getoneRSVP = getOneRecord(RSVP);
exports.getAllRSVP = getAllRecords(RSVP);
exports.updateRSVP = updateRecord(RSVP);
exports.deleteOneRSVP = deleteOneRecord(RSVP);
exports.deleteALLRSVP = deleteAllRecords(RSVP);

exports.displayRSVP = (req, res, next) => {
  Meetup.findById(req.response.meetup)
    .then((meetup) => {
      res.status(201).json({
        status: 201,
        data: {
          topic: meetup.topic,
          meetupId: meetup._id,
        },
      });
    })
    .catch((err) => {
      return next(err);
    });
};
