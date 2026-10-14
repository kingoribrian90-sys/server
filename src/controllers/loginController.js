const { promisify } = require('node:util');
const {
  randomBytes,
  scrypt: scryptCallback,
  timingSafeEqual,
} = require('node:crypto');
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

  const user = await Signup.findOne({ emailaddress })
    .select('+passwordhash +password');
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  let passwordMatches = false;
  if (typeof user.passwordhash === 'string') {
    const match = /^([a-f0-9]{32}):([a-f0-9]{128})$/i.exec(user.passwordhash);
    if (match) {
      const submittedHash = await scrypt(password, match[1], 64);
      const expectedHash = Buffer.from(match[2], 'hex');
      passwordMatches = timingSafeEqual(expectedHash, submittedHash);
    }
  } else if (typeof user.password === 'string' && user.password === password) {
    const salt = randomBytes(16).toString('hex');
    const hash = await scrypt(password, salt, 64);
    user.passwordhash = `${salt}:${hash.toString('hex')}`;
    user.password = undefined;
    await user.save();
    passwordMatches = true;
  }

  if (!passwordMatches) {
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
