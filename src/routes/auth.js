const express = require('express');
const router = express.Router();

router.use('/login', require('./loginroute'));

module.exports = router;