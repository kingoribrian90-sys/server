const Houseowner = require('../models/Houseowner');

exports.postHouseOwner = async (req, res) => {
  const listing = await Houseowner.create({
    county: req.body.county,
    locality: req.body.locality,
    housetype: req.body.housetype || req.body.houseType,
    electricitybillingmode:
      req.body.electricitybillingmode || req.body.electricityBillingmode,
    waterbillingmode: req.body.waterbillingmode || req.body.waterBillingmode,
    monthlybudget: req.body.monthlybudget ?? req.body.monthlyBudget,
    emailaddress: req.body.emailaddress || req.body.emailAddress,
  });

  res.status(201).json({ success: true, data: listing });
};
