const express = require('express');
const checkDatabase = require('../middleware/checkDatabase');

const router = express.Router();

router.get('/', checkDatabase, (req, res) => {
  res.status(200).json({
    status: 'ok',
    server: 'ok',
    database: 'connected',
  });
});

module.exports = router;
