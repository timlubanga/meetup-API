const express = require('express');
const {
  createUser,
  loginUser,
  protect,
} = require('../Controllers/authController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
