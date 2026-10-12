const express = require('express');
const { getListings } = require('../controllers/tenantController');
const { postHouseOwner } = require('../controllers/houseownerController');

const router = express.Router();

router.get('/', getListings);
router.post('/', postHouseOwner);

module.exports = router;
