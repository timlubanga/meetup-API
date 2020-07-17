const mongoose = require('mongoose');
const validator = require('validator');
questionSchema = mongoose.Schema(
  {
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    meetup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meetup',
      required: [true, 'please fill out the meetupid for the question'],
    },
    title: {
      type: String,
      required: [true, 'please fill out the title'],
    },
    body: {
      type: String,
      required: [true, 'please provide  the description of the question'],
    },

    votes: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    },

    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// questionSchema.pre(/^find/, function () {
//   this.populate({
//     path: 'meetup',
//     select: '-__v ',
//   });
// });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
