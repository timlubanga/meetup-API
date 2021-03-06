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

exports.CheckVotingStatusandProvideandOption = (option) => {
  return (req, res, next) => {
    if (!req.params.questionId)
      return next(AppError('please provide the question id', 500));
    req.body.question = req.params.questionId;
    req.body.option = option;

    //check is the use alreally voted
    Vote.findOne({ user: req.user._id, question: req.body.question })
      .then((user) => {
        if (user)
          return next(new AppError('please note that you already voted', 403));
        next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
