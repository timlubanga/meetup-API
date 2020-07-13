const {
  createDoc,
  getOneRecord,
  getAllRecords,
  updateRecord,
  deleteAllRecords,
  deleteOneRecord,
} = require('../Controllers/factoryController');

const RSVP = require('../Models/rsvpModel');

exports.createRSVP = createDoc(RSVP);
exports.getoneRSVP = getOneRecord(RSVP);
exports.getAllRSVP = getAllRecords(RSVP);
exports.updateRSVP = updateRecord(RSVP);
exports.deleteOneRSVP = deleteOneRecord(RSVP);
exports.deleteALLRSVP = deleteAllRecords(RSVP);
