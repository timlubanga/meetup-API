const moongose = require('mongoose');
const validator = require('validator');

meetupSchema = moongose.Schema(
  {
    createdOn: {
      type: Date,
      default: Date.now(),
    },

    category:{
      type:String,
      required:[true, "please provide the meetup category"],
      enum:["careers & Business", "outdoor and adventure", "learning", "health and wellness", "technology & engineering"]
    },

    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },

      coordinates: [Number],
      address: {
        type:String,
        required:[true, "please fill out the address"]
      }
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
meetupSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'meetup',
  justOne: false,
});

meetupSchema.pre(/^find/, function () {
  this.populate('questions');
});
const Meetup = moongose.model('Meetup', meetupSchema);

module.exports = Meetup;
