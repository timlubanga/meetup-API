const multer = require('multer');
const AppError = require('./appError');
const filterFiles = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (!file.mimetype.startsWith('image'))
    return cb(new AppError('file not accepted'));
  // To accept the file pass `true`, like so:
  else cb(null, true);
};

module.exports = filterFiles;
