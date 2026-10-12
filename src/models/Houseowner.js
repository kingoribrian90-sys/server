const mongoose = require('mongoose');

const houseownerSchema = new mongoose.Schema({
  county: { type: String, required: true, trim: true },
  locality: { type: String, required: true, trim: true },
  housetype: { type: String, required: true, trim: true },
  electricitybillingmode: { type: String, required: true, trim: true },
  waterbillingmode: { type: String, required: true, trim: true },
  monthlybudget: { type: Number, required: true, min: 0 },
  emailaddress: { type: String, required: true, trim: true, lowercase: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Houseowner', houseownerSchema);