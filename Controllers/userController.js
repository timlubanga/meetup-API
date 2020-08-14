const Users = require('../Models/userModel');
const AppError = require('../utils/appError');
const multer = require('multer');
const sharp = require('sharp');
const {
  getAllRecords,
  getOneRecord,
  deleteAllRecords,
  deleteOneRecord,
  updateRecord,
  createDoc,
} = require('../Controllers/factoryController');

const storage = multer.memoryStorage();

const filterFiles = require('../utils/filterImage');

const upload = multer({ storage: storage, fileFilter: filterFiles });

exports.processFiles = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.body.photo = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .toFile(`public/users_photos/${req.body.photo}`)
    .then((res) => {
      next();
    })
    .catch((err) => {
      return next(new AppError(err));
    });
};

const filterBody = (body, ...allowedFields) => {
  let newBody = {};
  for (key in body) {
    if (allowedFields.includes(key)) {
      newBody[key] = body[key];
    }
  }

  return newBody;
};

exports.filterBodyForUpdate = (req, res, next) => {
  const newBody = filterBody(
    req.body,
    'firstname',
    'lastname',
    'email',
    'photo'
  );
  req.body = newBody;

  // if (req.file) req.body.photo = req.file.filename;
  // req.params.id = req.user._id;
  next();
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
exports.getAllUsers = getAllRecords(Users);
exports.getUser = getOneRecord(Users);
exports.updateUser = updateRecord(Users);
exports.deleteUser = updateRecord(Users, { active: false });
