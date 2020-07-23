const express = require('express');
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../Controllers/authController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(resetPassword)

module.exports = router;
