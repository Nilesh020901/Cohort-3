const express = require('express');
const router = express.Router();
const { getAllPackages } = require('../controllers/packageControllers');

router.get('/', getAllPackages);

module.exports = router;