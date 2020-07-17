const {
  createDoc,
  getAllRecords,
  getOneRecord,
  deleteAllRecords,
  deleteOneRecord,
  updateRecord,
} = require('./factoryController');

const Question = require('../Models/questionModel');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

exports.createQuestion = createDoc(Question);
exports.getQuestion = getOneRecord(Question);
exports.updateQuestion = updateRecord(Question);
exports.deleteQuestion = deleteOneRecord(Question);
exports.getAllQuestions = getAllRecords(Question);
exports.deleteAllQuestions = deleteAllRecords(Question);

exports.sortQuestionsPerupvotes = (req, res, next) => {
  //convert id in mongoose objectid as it is not autocasted into string in aggregrate
  const meetup = mongoose.Types.ObjectId(req.params.meetupid);
  Question.aggregate([
    {
      $match: {
        meetup: meetup,
      },
    },
    {
      $project: { meetup: 1, upvotes: 1, body: 1, title: 1 },
    },
    {
      $sort: {
        upvotes: -1,
      },
    },
  ])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getNumberofQuesuestionsPostedByUser = (req, res, next) => {
  
  Question.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(req.user._id),
      },
    },

    {
      $count: 'totalQuestionPosted',
    },
  ])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      next(new AppError(err));
    });
};
