const Users = require('../Models/userModel');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const createToken = (user) => {
  return jwt.sign(
    { data: user },
    process.env.SECRETKEY,
    { expiresIn: process.env.EXPIRES_IN }
  );
};

exports.createUser =
  ('/createUser',
  (req, res) => {
    Users.create(req.body)
      .then((user) => {
        const token = createToken(user);
        res.status(202).json({ data: user, token: token });
      })
      .catch((err) => {
        console.log(err);

        res.status(400).json({ message: err });
      });
  });

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res
      .status(404)
      .json({ message: 'please provide email or password' });
  User.findOne({ email: req.body.email })
    .select('+password')
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'no user found' });
      console.log(user.password);
      if (user.password === req.body.password) {
        const newToken = createToken(user);
        return res.status(200).json({ data: user, token: newToken });
      }
      return res.status(500).json({ message: 'wrong password  or username' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(403).json({ Message: 'no permission, please sign in' });
  token = req.headers.authorization.split(' ')[1];

  await promisify(jwt.verify)(token, process.env.SECRETKEY)
    .then((decoded) => {
      console.log(decoded);
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ message: err });
    });
};
