const {
  createDoc,
  getAllRecords,
  getOneRecord,
  deleteAllRecords,
  deleteOneRecord,
  updateRecord,
} = require('./factoryController');

const Meetup = require('../Models/meetupModel');
const sharp = require('sharp');
exports.createMeetup = createDoc(Meetup);
exports.getOneMeetup = getOneRecord(Meetup);
exports.updateMeetup = updateRecord(Meetup);
exports.deleteOneMeetup = deleteOneRecord(Meetup);
exports.getAllMeetups = getAllRecords(Meetup);
exports.deleteAllMeetups = deleteAllRecords(Meetup);
const multer = require('multer');

const fileFilter = require('../utils/filterImage');

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });
exports.handleFilewithMulter = upload.array('photos');

exports.resizephotos = (req, res, next) => {
  if (req.params.meetupid) {
    req.params.id = req.params.meetupid;
    console.log(req.params.id);
  }
  if (!req.files) return next();
  if (!req.files.length) return next();
  req.body.images = [];
  Promise.all(
    req.files.map(async (file, index) => {
      const filename = `photo-${Date.now()}-${index + 1}meetup.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .toFile(`meetupfrontend/public/meetup-photos/${filename}`);
      req.body.images.push(filename);
    })
  )
    .then(() => {
      next();
    })
    .catch((err) => {
      return next(err);
    });
};

exports.getupcomingMeetings = (req, res, next) => {
  Meetup.aggregate([
    {
      $sort: { happeningOn: 1 },
    },

    {
      $project: {
        happeningOn: 1,
        location: 1,
        topic: 1,
        tags: 1,
        images: 1,
      },
    },
  ]).then((results) => {
    res.status(200).json(results);
  });
};

exports.updatePhotosOnly = (req, res, next) => {
  if (!req.body.images) return next();

  Meetup.updateOne(
    { _id: req.params.id },
    {
      $push: { images: { $each: req.body.images } },
    }
  )
    .then(() => {
      delete req.body.images;
      next();
    })
    .catch((err) => {
      return next(err);
    });
};
