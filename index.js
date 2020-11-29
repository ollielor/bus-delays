const express = require('express')
const mongoose = require('mongoose');
const port = 8080;
require('dotenv').config();

const departureRoutes = require('./routes/departures');

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use('/', departureRoutes);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });

