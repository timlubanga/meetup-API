const Users = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const createToken = (user) => {
  return jwt.sign({ data: user }, process.env.SECRETKEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.createUser = (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      const token = createToken(user);
      res.status(202).json({ data: user, token: token });
    })
    .catch((err) => {
      return next(new AppError(err, 400));
    });
};

exports.loginUser = (req, res) => {
  console.log(req.query);
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
