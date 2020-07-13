const mongoose = require('mongoose');
const RsvpSchema=mongoose.Schema({
  meetup: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the meetup id'],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the user id'],
  },
  response: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
  },
});

const RSVP=mongoose.model("Rsvp", RsvpSchema )
