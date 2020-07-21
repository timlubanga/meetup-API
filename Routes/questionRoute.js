const express = require('express');
const voteRouter = require('./voteRoute');

const router = express.Router({ mergeParams: true });

const {
  createQuestion,
  getQuestion,
  getAllQuestions,
  deleteQuestion,
  deleteAllQuestions,
  updateQuestion,
  sortQuestionsPerupvotes,
  getNumberofQuesuestionsPostedByUser,
  topQuestionFeedsForuser,
} = require('../Controllers/questionController');
const { protect } = require('../Controllers/authController');
router.use(protect);
router.get('/:meetupid/getquestionByupvotes', sortQuestionsPerupvotes);
router.get('/totalquestionpostedByUser', getNumberofQuesuestionsPostedByUser);
router.get('/topquestionFeedforUser', topQuestionFeedsForuser);
router
  .route('/')
  .post(createQuestion)
  .get(getAllQuestions)
  .delete(deleteAllQuestions);
router.use(protect);
router
  .route('/:id')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

router.use('/:questionId/votes', voteRouter);
module.exports = router;
