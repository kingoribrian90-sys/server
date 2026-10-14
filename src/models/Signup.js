const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    emailaddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordhash: { type: String, required: true, select: false },
    password: { type: String, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Signup', signupSchema);
