const express = require('express');
const {
  upvoteQuestion,
  downVoteQuestion,
  questionId,
} = require('../Controllers/voteController');
const { protect } = require('../Controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/question/:questionId/upvote').post(questionId, upvoteQuestion);
router
  .route('/question/:questionId/downvote')
  .post(questionId, downVoteQuestion);

module.exports = router;
