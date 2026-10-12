const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signupControllers');

router.post('/', signup);

module.exports = router;
