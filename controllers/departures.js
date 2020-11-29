const axios = require('axios');

exports.getDepartures = (req, res, next) => {
   axios.get('https://v5.bvg.transport.rest/stops/900000023301/departures')
      .then((response) => {
         console.log(response.data)
         // handle success
         const onlyBuses = filterBuses(response.data);
         console.log(onlyBuses);
         const busesByLine = onlyBuses.map(busDeparture => {return {line: busDeparture.line.name, delay: busDeparture.delay !== null && busDeparture.delay}})
         console.log(busesByLine);
      })
      .catch((error) => {
         // handle error
         console.log(error);
      })
      .then(() => {
         // always executed
   });
}

const filterBuses = (departure) => {
   return departure.filter(d => d.line.mode === 'bus')
}