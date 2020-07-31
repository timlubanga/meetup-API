const AppError = require('../utils/appError');

const sendToDevelopment = (err, req, res, next) => {
  if (err.statusCode)
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: err.status, stack: err.stack });

  if (err.name === 'TokenExpiredError') return res.status(403).json(err);
  return res.status(500).json({ err });
};

const sendToProduction = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (process.env.NODE_ENV == 'development')
    return sendToDevelopment(err, req, res);
  if (process.env.NODE_ENV == 'production') {
    if (err.name == 'CastError') {
      error = new AppError('Sorry, you entered wrong ID', 404);
    } else if (err.name == 'ValidationError') {
      const errors = Object.values(err.errors)
        .map((el) => {
          return el.message;
        })
        .join(' ');

      error = new AppError(errors, 400);
    } else if (err.name == 'MongoError') {
      error = new AppError(err.errmsg, 400);
    } else if ((err.name = 'TokenExpiredError')) {
      error = new AppError('The token has expired, please sign in again', 403);
    } else {
      error = err;
    }

    sendToProduction(error, req, res);
  }
};

module.exports = errorHandler;
