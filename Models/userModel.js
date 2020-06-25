const moongose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const crypto = require('crypto');
userSchema = moongose.Schema({
  Firstname: {
    type: String,
    required: [true, "Please provide your name"],
    validate: [validator.isAlpha, "A name cannot have a number"],
  },

  Lastname: {
    type: String,
    required: [true, "Please provide your name"],
    validate: [validator.isAlpha, "A name cannot have a number"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "please provide a valid email address"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordResetToken: String,
  passwordTokenExpiresAt: Date,
  password: {
    type: String,

    minLength: 8,
    required: [true, "please provide a password"],
    select: false,
  },
  passwordChangeAt: {
    type: Date,
    default: undefined,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      //runs on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "The passwords are not the same",
    },
  },
});

const User = moongose.model("User", userSchema);

module.exports = User;
