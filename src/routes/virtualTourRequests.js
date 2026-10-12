const express = require('express');
const {
  postVirtualtourrequest,
} = require('../controllers/virtualtourrequestController');

const router = express.Router();

router.post('/', postVirtualtourrequest);

module.exports = router;
