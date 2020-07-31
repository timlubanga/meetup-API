const express = require('express');
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  protect,
} = require('../Controllers/authController');
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  filterBodyForUpdate,
} = require('../Controllers/userController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').post(resetPassword);
router.route('/').get(protect, getAllUsers);
router
  .route('/:id')
  .patch(filterBodyForUpdate, updateUser)
  .delete(deleteUser)
  .get(getUser);

module.exports = router;
