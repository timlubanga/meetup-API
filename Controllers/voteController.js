const Vote = require('../Models/voteModel');
const AppError = require('../utils/appError');

const {
  updateRecord,
  createDoc,
  deleteOneRecord,
  getAllRecords,
} = require('../Controllers/factoryController');

exports.upvoteQuestion = createDoc(Vote);
exports.downVoteQuestion = createDoc(Vote);
exports.deleteAvote = deleteOneRecord(Vote);
exports.getALLVotes = getAllRecords(Vote);

exports.questionId = (req, res, next) => {
  if (!req.params.questionId)
    return next(AppError('please provide the question id', 500));
  req.body.question = req.params.questionId;

  //check is the use alreally voted
  if (req.user) {
    Vote.findOne({ user: req.user._id, question: req.params.questionId })
      .then((user) => {
        if (user)
          return next(new AppError('please note that you already voted', 403));
        next();
      })
      .catch((err) => {
        return next(err);
      });
  }
};
