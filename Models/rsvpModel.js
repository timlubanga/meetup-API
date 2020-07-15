const mongoose = require('mongoose');
const RsvpSchema = mongoose.Schema({
  meetup: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the meetup id'],
    ref: 'Meetup',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the user id'],
    ref: 'User',
  },
  response: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
  },
});

// RsvpSchema.pre(/^find/, function () {
//   this.populate('meetup');
// });
const RSVP = mongoose.model('Rsvp', RsvpSchema);

module.exports = RSVP;
