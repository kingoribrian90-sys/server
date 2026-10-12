const { promisify } = require('node:util');
const { scrypt: scryptCallback, timingSafeEqual } = require('node:crypto');
const Signup = require('../models/Signup');

const scrypt = promisify(scryptCallback);

exports.postLogin = async (req, res) => {
  const emailaddress = String(req.body.emailaddress || req.body.emailAddress || '')
    .trim()
    .toLowerCase();
  const { password } = req.body;

  if (!emailaddress || typeof password !== 'string' || !password) {
    return res.status(400).json({
      error: 'emailaddress and password are required',
    });
  }

  const user = await Signup.findOne({ emailaddress }).select('+passwordhash');
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const [salt, storedHash] = user.passwordhash.split(':');
  const submittedHash = await scrypt(password, salt, 64);
  const expectedHash = Buffer.from(storedHash, 'hex');

  if (expectedHash.length !== submittedHash.length ||
      !timingSafeEqual(expectedHash, submittedHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      emailaddress: user.emailaddress,
    },
  });
};
