const mongoose = require('mongoose');

voteSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the question id'],
    index:{
      unique:true
    }
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'please provide the user id'],
    index:{
      unique:true
    }

  },
  option: {
    type: String,
    enum: ['upvote', 'downvote'],
  },
});

// voteSchema.index({ question: 1, user: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
