const express = require('express');

const departureController = require('../controllers/departures')

const router = express.Router();

router.get('/departures', departureController.getDepartures);

router.get('/alldepartures', departureController.getAllDepartures);

router.get('/average', departureController.getAverageDelay);

router.get('/lines', departureController.getLines);

module.exports = router;