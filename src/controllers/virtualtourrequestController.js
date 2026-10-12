const Virtualtourrequest = require('../models/virtualtourrequest');

exports.postVirtualtourrequest = async (req, res) => {
  const request = await Virtualtourrequest.create({
    emailaddress: req.body.emailaddress || req.body.emailAddress,
    dateandtime: req.body.dateandtime || req.body.dateAndTime,
  });

  res.status(201).json({ success: true, data: request });
};
