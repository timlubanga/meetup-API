const moongose = require('mongoose');
const validator = require('validator');

meetupSchema = moongose.Schema({
  createdOn: {
    type: Date,
    default: Date.now(),
  },

  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },

    coordinates: [Number],
    address: String,
  },

  topic: {
    type: String,
    required: [true, 'please specify topic'],
  },

  images: [String],
  tags: [String],

  happeningOn: {
    type: Date,
    validate: {
      //runs on create and save
      validator: function (el) {
        return el > this.createdOn;
      },
      message: 'please choose a valid date',
    },
  },
});

const Meetup = moongose.model('meetup', meetupSchema);

module.exports = Meetup;
