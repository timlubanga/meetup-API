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
const { protect, authorize } = require('../Controllers/authController');
const { CheckifTheIdisValid } = require('../Controllers/factoryController');
const Meetup = require('../Models/meetupModel');
const Question = require('../Models/questionModel');

router.use(protect);
router.get(
  '/:meetupid/getquestionByupvotes',
  authorize('admin'),
  CheckifTheIdisValid(Meetup, 'meetupid'),
  sortQuestionsPerupvotes
);
router.get(
  '/totalquestionpostedByUser',
  authorize('user'),
  getNumberofQuesuestionsPostedByUser
);
router.get(
  '/topquestionFeedforUser',
  authorize('user'),
  topQuestionFeedsForuser
);
router
  .route('/')
  .post(
    authorize('user'),
    CheckifTheIdisValid(Meetup, 'meetupid'),
    createQuestion
  )
  .get(authorize('admin'), getAllQuestions)
  .delete(authorize('admin'), deleteAllQuestions);

router
  .route('/:id')
  .get(CheckifTheIdisValid(Question, 'id'), getQuestion)
  .patch(authorize('user'), CheckifTheIdisValid(Question, 'id'), updateQuestion)
  .delete(
    authorize('admin', 'user'),
    CheckifTheIdisValid(Question, 'id'),
    deleteQuestion
  );

router.use('/:questionId/votes', voteRouter);
module.exports = router;
