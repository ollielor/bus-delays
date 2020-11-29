const Bus = require('../models/bus');

const axios = require('axios');

exports.getDepartures = (req, res, next) => {
   axios.get('https://v5.bvg.transport.rest/stops/900000023301/departures?duration=5')
      .then(response => {
         // handle success
         const onlyBuses = filterBuses(response.data);
         const busesByLine = onlyBuses.map(busDeparture => {return {
            line: busDeparture.line.name, 
            delay: busDeparture.delay, 
            direction: busDeparture.direction
         }})
         for (let i=0; i < busesByLine.length; i++) {
            const busInfo = new Bus({
               line: busesByLine[i].line,
               delay: busesByLine[i].delay,
               direction: busesByLine[i].direction
            })
            busInfo.save();
         }
      })
      .catch((error) => {
         // handle error
         console.log(error);
      })
      .then(() => {
         // always executed
   });
}

// Executed on start and then every 5 minutes
this.getDepartures();
setInterval(this.getDepartures, 300000);

const filterBuses = (departure) => {
   return departure.filter(d => d.line.mode === 'bus')
}

exports.getAllDepartures = (req, res, next) => {
   Bus.find()
      .then(busDepartures => {
         res.status(200).json({
            allDepartures: busDepartures
         })
      })
      .catch(error => {
         console.log(error);
      })
}

exports.deleteDocuments = (req, res, next) => {
   Bus.deleteMany({})
      .then(result => {
         console.log(result);
      })
      .catch(error => {
         console.log(error);
      })
}