const express = require('express');
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  protect,
  authorize,
} = require('../Controllers/authController');
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  filterBodyForUpdate,
  processFiles,
  resizeUserPhoto,
} = require('../Controllers/userController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').post(resetPassword);
router.use(protect);
router.route('/').get(authorize('admin'), getAllUsers);
router
  .route('/:id')
  .patch(
    authorize('user'),
    processFiles,
    resizeUserPhoto,
    filterBodyForUpdate,
    updateUser
  )
  .delete(authorize('admin'), deleteUser)
  .get(authorize('admin'), getUser);

module.exports = router;
