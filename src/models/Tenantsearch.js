const mongoose = require('mongoose');

const tenantsearchSchema = new mongoose.Schema(
  {
    county: { type: String, required: true, trim: true },
    locality: { type: String, required: true, trim: true },
    budgetrange: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tenantsearch', tenantsearchSchema);
