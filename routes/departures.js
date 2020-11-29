const express = require('express');

const departureController = require('../controllers/departures')

const router = express.Router();

router.get('/departures', departureController.getDepartures);

module.exports = router;