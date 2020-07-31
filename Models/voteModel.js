const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const Question = require('../Models/questionModel');

voteSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the question id'],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the user id'],
  },
  option: {
    type: String,
    enum: ['upvote', 'downvote'],
  },
});

// voteSchema.index({ question: 1, user: 1 }, { unique: true });

voteSchema.statics.CalculateDownVoteandUpvotes = function (questionId, next) {
  const newQuestion = mongoose.Types.ObjectId(questionId);
  this.aggregate([
    {
      $match: { question: newQuestion },
    },
    {
      $group: {
        _id: '$option',
        votes: { $sum: 1 },
      },
    },

    {
      $project: {
        votes: 1,
      },
    },
  ]).then((results) => {
    let upvotes = 0;
    let downvotes = 0;
    if (results[0]._id == 'upvote') upvotes = results[0].votes;
    if (results[0]._id == 'downvote') downvotes = results[0].votes;
    if (results[1]) downvotes = results[1].votes;

    const votes = sumVotes(upvotes, downvotes);
    Question.findByIdAndUpdate(questionId, {
      upvotes: upvotes,
      downvotes: downvotes,
      votes: votes,
    })
      .then(() => {
        console.log('question updated');
      })
      .catch((err) => {
        console.log('something went wrong updating the question');
        next(err)
      });
  });
};

voteSchema.post('save', function (next) {
  this.constructor.CalculateDownVoteandUpvotes(this.question, next);
});

voteSchema.pre(/^findOneAnd/, async function (next) {
  // this.model.findOne(this.getQuery(),(doc)=>{

  this.vote = await this.model.findOne();

  next();
});

voteSchema.post(/^findOneAnd/, function (res, next) {
  console.log('updating in progress');
  this.vote.constructor.CalculateDownVoteandUpvotes(this.vote.question, next);
  next();
});

const Vote = mongoose.model('Vote', voteSchema);

const sumVotes = (...args) => {
  return args.reduce((acc, current) => {
    return acc + current;
  });
};

module.exports = Vote;
