const { randomBytes, scrypt: scryptCallback } = require('node:crypto');
const { promisify } = require('node:util');
const Signup = require('../models/Signup');

const scrypt = promisify(scryptCallback);

exports.signup = async (req, res) => {
  try { // DEBUG-TEMP
    console.log('Signup: request received; body keys:', Object.keys(req.body || {})); // DEBUG-TEMP
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
    console.log('Signup: before password hashing'); // DEBUG-TEMP
    const hash = await scrypt(password, salt, 64);
    console.log('Signup: after password hashing'); // DEBUG-TEMP
    console.log('Signup: before saving user'); // DEBUG-TEMP
    const user = await Signup.create({
      username,
      emailaddress,
      passwordhash: `${salt}:${hash.toString('hex')}`,
    });
    console.log('Signup: after saving user'); // DEBUG-TEMP

    console.log('Signup: before sending response'); // DEBUG-TEMP
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        emailaddress: user.emailaddress,
      },
    });
  } catch (error) { // DEBUG-TEMP
    console.error('Signup failed:', error); // DEBUG-TEMP
    if (!res.headersSent) { // DEBUG-TEMP
      res.status(500).json({ error: 'Internal server error' }); // DEBUG-TEMP
    } // DEBUG-TEMP
  } // DEBUG-TEMP
};
