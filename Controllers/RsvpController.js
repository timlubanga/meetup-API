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
const Mongoose = require('mongoose');

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

exports.getupcomingMeetingsForAuser = (req, res, next) => {
  // RSVP.find({ user: req.user._id })
  //   .then((results) => {
  //     return results.map((el) => {
  //       return el.meetup;
  //     });
  //   })
  //   .then((meetup) => {
  //     const newMeetup = meetup.sort((a, b) => {
  //       return a.happeningOn - b.happeningOn;
  //     });
  //     res.status(200).json(newMeetup);
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });

  RSVP.aggregate([
    {
      $match: {
        user: Mongoose.Types.ObjectId(req.user._id),
        response: 'yes',
      },
    },

    {
      $lookup: {
        from: 'meetups',
        localField: 'meetup',
        foreignField: '_id',
        as: 'meetup_scheduled',
      },
    },

    {
      $project: {
        meetup_scheduled: 1,
      },
    },
    {
      $unwind: '$meetup_scheduled',
    },
    {
      $sort: { 'meetup_scheduled.happeningOn': 1 },
    },
  ])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      next(new AppError(err));
    });
};
