const AppError = require('../utils/appError');
const mongoose = require('mongoose');
exports.deleteOneRecord = (Model) => (req, res, next) => {
  if (req.params.meetupid) req.params.id = req.params.meetupid;
  Model.findByIdAndDelete(req.params.id)

    .then((data) => {
      if (!data) {
        return next(new AppError('The record is not found', 404));
      } else {
        res.status(204).json({
          status: 204,
          message: 'deleted',
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteAllRecords = (Model) => (req, res, next) => {
  let query = {};
  let message = 'all records deleted';
  Model.deleteMany(query)
    .then(() => {
      res.status(204).json({
        message: message,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllRecords = (Model) => (req, res, next) => {
  let query = {};

  if (req.params.meetupid) {
    query = { meetup: req.params.meetupid };
  }

  if (Object.keys(req.query).length && Object.values(req.query)[0]) {
    query = JSON.stringify(req.query);
    // Advanced filtering
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => {
      return `$${match}`;
    });
    query = JSON.parse(query);
  }

  const limit = +query.limit || 0;

  const items = (+query.pages - 1) * limit || 0;
  const sort = query.sort;
  const displayfields = query.displayfields
    ? query.displayfields.split(',').join(' ')
    : null;
  ['sort', 'displayfields', 'limit', 'pages'].forEach((el) => {
    delete query[el];
  });

  Model.find(query)
    .sort(sort)
    .skip(items)
    .select(displayfields)
    .limit(limit)
    .then((docs) => {
      res.status(200).json({
        status: 'success',
        docs,
      });
    })

    .catch((err) => {
      next(err);
    });
};

exports.getOneRecord = (Model) => (req, res, next) => {
  let id;
  if (req.params.meetupid) id = req.params.meetupid;
  if (req.params.id) id = req.params.id;
  Model.findById(id)
    .then((records) => {
      if (!records) {
        return next(new AppError('The record not found', 404));
      }
      res.status(200).json({
        records,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.createDoc = (Model) => (req, res, next) => {
  if (req.user) req.body.user = req.user._id;
  if (req.params.meetupid) req.body.meetup = req.params.meetupid;

  Model.create(req.body)
    .then((docs) => {
      if (docs.response) {
        req.response = docs;
        return next();
      }
      res.status(201).json({
        status: '201',
        data: docs,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateRecord = (Model, options = {}) => (req, res, next) => {
  if (Object.values(options).length && Object.keys(options).length) {
    req.body = { ...options };
  }

  if (!Object.values(req.body).length || !Object.keys(req.body).length) {
    const err = new AppError('Please specify fields', 400);

    return next(err);
  }

  Model.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((doc) => {
      if (!doc) {
        return next(
          new AppError(
            'An internal error occured, please check your id to make sure it is correct',
            400
          )
        );
      }

      return res.status(202).json(doc);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.CheckifTheIdisValid = (Model, paramId) => {
  return (req, res, next) => {
    console.log(req.params);
    if (!req.params) {
      return next();
    }

    const isValid = mongoose.Types.ObjectId.isValid(req.params[paramId]);

    if (!isValid)
      return next(new AppError(`please enter a valid ${paramId}`, 404));
    const id = req.params[paramId];

    Model.findById(id).then((data) => {
      if (!data)
        return next(new AppError(`please provide a valid ${paramId}`, 404));
      next();
    });
  };
};
