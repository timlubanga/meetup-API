const express = require('express');
const {
  createUser,
  loginUser,
  protect,
} = require('../Controllers/authController');

const router = express.Router();

router.route('/register').post(protect, createUser);
router.route('/login').post(loginUser);

module.exports = router;
