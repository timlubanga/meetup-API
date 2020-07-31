const express = require('express');
const {
  upvoteQuestion,
  downVoteQuestion,

  deleteAvote,
  getALLVotes,
  CheckVotingStatusandProvideandOption,
} = require('../Controllers/voteController');
const { protect } = require('../Controllers/authController');

const { CheckifTheIdisValid } = require('../Controllers/factoryController');
const Question = require('../Models/questionModel');
const { checkout } = require('./rsvpRoute');
const router = express.Router({ mergeParams: true });

router.use(protect);

router.post(
  '/upvote',
  CheckifTheIdisValid(Question, 'questionId'),
  CheckVotingStatusandProvideandOption('upvote'),
  upvoteQuestion
);
router.post(
  '/downvote',
  CheckifTheIdisValid(Question, 'questionId'),
  CheckVotingStatusandProvideandOption('downvote'),
  downVoteQuestion
);
router.get('/', getALLVotes);
router.delete('/:id', CheckifTheIdisValid(Question, 'id'), deleteAvote);

module.exports = router;
