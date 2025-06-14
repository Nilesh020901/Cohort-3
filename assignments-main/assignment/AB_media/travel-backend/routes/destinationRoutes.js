const express = require('express');
const { getAllDestinations } = require('../controllers/destinationcontrollers');
const router = express.Router();

router.get('/', getAllDestinations);

module.exports = router;