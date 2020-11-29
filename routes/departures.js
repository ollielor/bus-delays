const express = require('express');

const departureController = require('../controllers/departures')

const router = express.Router();

//router.get('/departures', departureController.getDepartures);

router.get('/alldepartures', departureController.getAllDepartures);

//router.get('/lines', departureController.getLines);

router.get('/delete', departureController.deleteDocuments);

module.exports = router;