const {
  createDoc,
  getAllRecords,
  getOneRecord,
  deleteAllRecords,
  deleteOneRecord,
  updateRecord,
} = require('./factoryController');

const Meetup = require('../Models/meetupModel');

exports.createMeetup = createDoc(Meetup);
exports.getOneMeetup = getOneRecord(Meetup);
exports.updateMeetup = updateRecord(Meetup);
exports.deleteOneMeetup = deleteOneRecord(Meetup);
exports.getAllMeetups = getAllRecords(Meetup);
exports.deleteAllMeetups = deleteAllRecords(Meetup);

exports.getupcomingMeetings = (req, res, next) => {
  Meetup.aggregate([
    {
      $sort: { happeningOn: 1 },
    },

    {
      $project: {
        happeningOn:1,
        location: 1,
        topic: 1,
        tags: 1,
      },
    },
  ]).then((results) => {
    res.status(200).json(results);
  });
};

