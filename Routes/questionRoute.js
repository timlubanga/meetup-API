const express = require('express');
const voteRouter = require('./voteRoute');

const router = express.Router({mergeParams:true});

const {
  createQuestion,
  getQuestion,
  getAllQuestions,
  deleteQuestion,
  deleteAllQuestions,
  updateQuestion,
} = require('../Controllers/questionController');


router
  .route('/')
  .post(createQuestion)
  .get(getAllQuestions)
  .delete(deleteAllQuestions);

router
  .route('/:id')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);
router.use('/:questionId/votes', voteRouter);
module.exports = router;
