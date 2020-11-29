const express = require('express')
const mongoose = require('mongoose');
const port = 8080;

const departureRoutes = require('./routes/departures');

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.get('/departures', departureRoutes);

mongoose
    .connect('mongodb+srv://bus-delays:6EzapHTfaUFrmU9R@bus-delays.ajnq6.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });

