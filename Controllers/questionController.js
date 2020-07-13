const {
  createDoc,
  getAllRecords,
  getOneRecord,
  deleteAllRecords,
  deleteOneRecord,
  updateRecord,
} = require('./factoryController');

const Question = require('../Models/questionModel');

exports.createQuestion = createDoc(Question);
exports.getQuestion = getOneRecord(Question);
exports.updateQuestion = updateRecord(Question);
exports.deleteQuestion = deleteOneRecord(Question);
exports.getAllQuestions = getAllRecords(Question);
exports.deleteAllQuestions = deleteAllRecords(Question);
