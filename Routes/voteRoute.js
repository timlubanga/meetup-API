const express = require('express');
const {
  upvoteQuestion,
  downVoteQuestion,

  deleteAvote,
  getALLVotes,
  CheckVotingStatusandProvideandOption,
} = require('../Controllers/voteController');
const { protect, authorize } = require('../Controllers/authController');

const { CheckifTheIdisValid } = require('../Controllers/factoryController');
const Question = require('../Models/questionModel');
const Vote = require('../Models/voteModel');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post(
  '/upvote',
  authorize('user'),
  CheckifTheIdisValid(Question, 'questionId'),
  CheckVotingStatusandProvideandOption('upvote'),
  upvoteQuestion
);
router.post(
  '/downvote',

  authorize('user'),
  CheckifTheIdisValid(Question, 'questionId'),
  CheckVotingStatusandProvideandOption('downvote'),
  downVoteQuestion
);
router.get('/', authorize('admin'), getALLVotes);
router.delete(
  '/:id',
  authorize('admin'),
  CheckifTheIdisValid(Vote, 'id'),
  deleteAvote
);

module.exports = router;
