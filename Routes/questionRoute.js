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
const { CheckifTheIdisValid } = require('../Controllers/factoryController');
const Meetup = require('../Models/meetupModel');
const Question = require('../Models/questionModel');

router.use(protect);
router.get(
  '/:meetupid/getquestionByupvotes',
  CheckifTheIdisValid(Meetup, 'meetupid'),
  sortQuestionsPerupvotes
);
router.get('/totalquestionpostedByUser', getNumberofQuesuestionsPostedByUser);
router.get('/topquestionFeedforUser', topQuestionFeedsForuser);
router
  .route('/')
  .post(CheckifTheIdisValid(Meetup, 'meetupid'), createQuestion)
  .get(getAllQuestions)
  .delete(deleteAllQuestions);

router
  .route('/:id')
  .get(CheckifTheIdisValid(Question, 'id'), getQuestion)
  .patch(CheckifTheIdisValid(Question, 'id'), updateQuestion)
  .delete(CheckifTheIdisValid(Question, 'id'), deleteQuestion);

router.use('/:questionId/votes', voteRouter);
module.exports = router;
