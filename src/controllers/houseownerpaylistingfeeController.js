const Houseownerpaylistingfee = require('../models/Houseownerpaylistingfee');

exports.postPaylisting = async (req, res) => {
  const paymentMethod = String(req.body.paymentMethod || 'mpesa').toLowerCase();
  if (paymentMethod !== 'mpesa') {
    return res.status(501).json({
      error: 'Only M-Pesa payment requests are supported; no payment provider is configured',
    });
  }

  if (req.body.cardNumber || req.body.cardnumber) {
    return res.status(400).json({
      error: 'Do not send card details; card payments are not configured',
    });
  }

  const payment = await Houseownerpaylistingfee.create({
    safaricomnumber: req.body.safaricomnumber || req.body.safaricomNumber,
    emailaddress: req.body.emailaddress || req.body.emailAddress,
  });

  res.status(202).json({
    success: true,
    message: 'Payment request created and is pending provider confirmation',
    data: payment,
  });
};
