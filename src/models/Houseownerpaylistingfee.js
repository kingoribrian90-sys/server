const mongoose = require('mongoose');

const houseownerpaylistingfeeSchema = new mongoose.Schema(
  {
    safaricomnumber: { type: String, required: true, trim: true },
    emailaddress: { type: String, required: true, trim: true, lowercase: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'Houseownerpaylistingfee',
  houseownerpaylistingfeeSchema
);
