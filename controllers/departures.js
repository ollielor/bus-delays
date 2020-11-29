const Bus = require('../models/bus');

const axios = require('axios');

exports.getDepartures = (req, res, next) => {
   console.log('getDepartures ran')
   axios.get('https://v5.bvg.transport.rest/stops/900000023301/departures')
      .then((response) => {
         console.log(response.data)
         // handle success
         const onlyBuses = filterBuses(response.data);
         console.log(onlyBuses);
         const busesByLine = onlyBuses.map(busDeparture => {return {line: busDeparture.line.name, delay: busDeparture.delay !== null && busDeparture.delay}})
         console.log(busesByLine);
         let bus;
         for (let i=0; i < busesByLine.length; i++) {
            const busInfo = new Bus({
               line: busesByLine[i].line,
               delay: busesByLine[i].delay
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

setInterval(this.getDepartures, 300000);

const filterBuses = (departure) => {
   return departure.filter(d => d.line.mode === 'bus')
}