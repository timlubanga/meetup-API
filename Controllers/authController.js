const Users = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const Email = require('../utils/email');
const crypto = require('crypto');
const createToken = (user) => {
  return jwt.sign({ data: user }, process.env.SECRETKEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.createUser = (req, res, next) => {
  Users.create(req.body)
    .then(async (user) => {
      const email = await new Email(
        user.email,
        'registration successful'
      ).sendSuccessRegistration(user.firstname);
      if (email.responseCode == 535)
        return next(new AppError(email.response, email.responseCode));
      const token = createToken(user);
      user = deselectPassword(user)
      res.status(202).json({ data: user, token: token });
    })
    .catch((err) => {
      return next(new AppError(err, 400));
    });
};

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res
      .status(404)
      .json({ message: 'please provide email or password' });
  Users.findOne({ email: req.body.email })
    .select('+password')
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'no user found' });

      const correct = user.comparePasswords(user.password, req.body.password);
      if (correct) {
        const newToken = createToken(user);
        user = deselectPassword(user);
        return res.status(200).json({ data: user, token: newToken });
      }
      return res.status(500).json({ message: 'wrong password  or username' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;
  //check if the request has a token
  if (!token)
    return res.status(403).json({ Message: 'no permission, please sign in' });
  token = req.headers.authorization.split(' ')[1];
  //check whether the token issud if valid
  await promisify(jwt.verify)(token, process.env.SECRETKEY)
    .then((decoded) => {
      return decoded;
    })
    .then(async (decoded) => {
      //check if the user still exists.it has not been deleted
      const user = await Users.findById(decoded.data._id);
      if (!user) {
        return next(new AppError('The user does not exist', 401));
      }
      //check whether the token was issued before the password has been changed
      if (user.passChangeAfterTokenIssued(decoded.iat)) {
        return next(new AppError('please login again. Password changed', 401));
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      return next(err);
    });
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Sorry, not allowed to access this endpoint', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = (req, res, next) => {
  //get user based on posted email
  Users.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) return next(new AppError('no address found', 404));
    const resetToken = user.generateResetToken();
    user.save({ validateBeforeSave: false }).then(async (newuser) => {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/resetPassword/${resetToken}`;

      const message = `Forgit your password? Do not worry, 
      kindly submit a request to reset it using the link provided ${resetURL}`;

      try {
        const info = await new Email(
          user.email,
          'password reset token sent'
        ).sendResetPasswordToken(user.firstname, message);
        res.status(200).json({
          message: 'success',
          info,
        });
      } catch (error) {
        (user.passwordResetToken = undefined),
          (user.passwordTokenExpiresAt = undefined),
          await user.save({ validateBeforeSave: false });
        return next(error);
      }
    });
  });
};

exports.resetPassword = (req, res, next) => {
  //get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  Users.findOne({
    passwordResetToken: hashedToken,
    passwordTokenExpiresAt: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      return next(new AppError('the token has expired or is incorrect', 403));
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    (user.passwordResetToken = undefined),
      (user.passwordTokenExpiresAt = undefined),
      (user.passwordChangeAt = Date.now());
    user
      .save({ validateBeforeSave: true })
      .then((user) => {
        const token = createToken(user);
        res.status(200).json({
          status: 'success',
          token,
        });
      })
      .catch((err) => {
        return next(new AppError(err));
      });
  });
  //if the token has not expired, and there is user,set the new password
  //update changedPasswordAt property for the user
  //log the user in send jwt
};

exports.updateMyPassword = (req, res, next) => {
  Users.findById(req.user._id).then((newuser) => {
    if (!newuser) {
      next(new AppError('The user does not exist anymore', 404));
    }
    newuser.password = req.body.password;
    newuser.confirmPassword = req.body.confirmPassword;
    newuser.passwordChangeAt = Date.now();
    newuser
      .save()
      .then((data) => {
        res.status(200).json({
          message: 'password changed successfully',
          status: 'success',
          data,
        });
      })
      .catch((err) => {
        next(new AppError(err));
      });
  });
};

const deselectPassword = (doc) => {
  delete doc._doc.password;
  return doc;
};
