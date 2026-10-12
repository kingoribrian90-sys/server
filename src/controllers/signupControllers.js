const { randomBytes, scrypt: scryptCallback } = require('node:crypto');
const { promisify } = require('node:util');
const Signup = require('../models/Signup');

const scrypt = promisify(scryptCallback);

exports.signup = async (req, res) => {
  const username = String(req.body.username || '').trim();
  const emailaddress = String(req.body.emailaddress || req.body.emailAddress || '')
    .trim()
    .toLowerCase();
  const { password } = req.body;

  if (!username || !emailaddress || typeof password !== 'string' || !password) {
    return res.status(400).json({
      error: 'username, emailaddress, and password are required',
    });
  }

  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  const user = await Signup.create({
    username,
    emailaddress,
    passwordhash: `${salt}:${hash.toString('hex')}`,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      username: user.username,
      emailaddress: user.emailaddress,
    },
  });
};
