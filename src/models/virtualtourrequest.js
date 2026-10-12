const mongoose = require('mongoose');

const virtualtourrequestSchema = new mongoose.Schema(
  {
    emailaddress: { type: String, required: true, trim: true, lowercase: true },
    dateandtime: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Virtualtourrequest', virtualtourrequestSchema);
