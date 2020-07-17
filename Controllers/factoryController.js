const AppError = require('../utils/appError');

exports.deleteOneRecord = (Model) => (req, res, next) => {
  Model.findByIdAndDelete(req.params.id)

    .then((data) => {
      if (!data) {
        return next(new AppError('The record is not found', 404));
      } else {
        res.status(204).json({
          status: 'success',
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
  Model.findById(req.params.meetupid)
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
  console.log('creating');
  if (req.user) req.body.user = req.user._id;
  if (req.params.meetupid) req.body.meetup = req.params.meetupid;
  Model.create(req.body)
    .then((docs) => {
      if (docs.meetup && docs.user) {
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
      res.status(202).json({ message: 'success', doc });
    })
    .catch((err) => {
      next(err);
    });
};
