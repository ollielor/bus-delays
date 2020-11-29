const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departureSchema = new Schema({
    buses: {
        type: Schema.Types.ObjectId,
        ref: 'Bus'
    }
}, { timestamps: true });

module.exports = mongoose.model('Departure', departureSchema);