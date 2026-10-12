const express = require('express');
const { postTenantSearch } = require('../controllers/tenantController');

const router = express.Router();

router.post('/', postTenantSearch);

module.exports = router;
