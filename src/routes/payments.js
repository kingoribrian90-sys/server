const express = require('express');
const { postPaylisting } = require('../controllers/houseownerpaylistingfeeController');

const router = express.Router();

router.post('/listing-fee', postPaylisting);

module.exports = router;
