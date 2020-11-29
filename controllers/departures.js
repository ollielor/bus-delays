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

exports.getAllDepartures = (req, res, next) => {
   Bus.find()
      .then(busDepartures => {
         res.status(200).json({data: busDepartures})
      })
      .catch(error => {
         console.log(error);
      })
}

exports.getAverageDelay = (req, res, next) => {
   Bus.find()
      .then(busDepartures => {
         const delays = busDepartures.map(busDeparture => parseInt(busDeparture.delay));
         console.log(delays);
         const onlyIntegers = delays.filter(delay => !isNaN(delay));
         const sumDelays = onlyIntegers.reduce((a, b) => a + b, 0);
         console.log(sumDelays)
         console.log(onlyIntegers.length)
         const average = sumDelays / onlyIntegers.length;
         res.status(200).json({
            averageDelay: average
         })
      })
}

exports.getLines = (req, res, next) => {
   Bus.find()
      .then(busDepartures => {
         const lineNumbers = busDepartures.map(busDeparture => busDeparture.line);
         console.log(lineNumbers)
         const lineNumbersWithoutDuplicates = lineNumbers.filter((lineNumber, index) => lineNumbers.indexOf(lineNumber) === index);
         console.log(lineNumbersWithoutDuplicates);
         res.status(200).json({
            lineNumbers: lineNumbersWithoutDuplicates
         })
      })
}