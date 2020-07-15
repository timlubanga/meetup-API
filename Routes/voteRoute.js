const express = require('express');
const {
  upvoteQuestion,
  downVoteQuestion,
  questionId,
  deleteAvote,
  getALLVotes,
} = require('../Controllers/voteController');
const { protect } = require('../Controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post('/upvote', questionId, upvoteQuestion);
router.post('/downvote', questionId, downVoteQuestion);
router.get('/', getALLVotes);
router.delete('/:id', deleteAvote);

module.exports = router;
