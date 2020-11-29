const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busSchema = new Schema({
    line: {
      type: String,
    },
    delay: {
       type: String,
    },
    direction: {
      type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);