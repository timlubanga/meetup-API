const express = require('express');

const router = express.Router();

const {
  createQuestion,
  getQuestion,
  getAllQuestions,
  deleteQuestion,
  deleteAllQuestions,
  updateQuestion,
} = require('../Controllers/questionController');
const { route } = require('./userRoute');

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

module.exports = router;
