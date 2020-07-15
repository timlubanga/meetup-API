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
exports.deleteAllMeetups=deleteAllRecords(Meetup)