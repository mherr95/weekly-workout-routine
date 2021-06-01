const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema ({
    day: {type: String, require: true},
    bodyPart: {type: String, require: true},
    exercise: {type: String}
},{timestamps: true});

const Day = mongoose.model('day', daySchema);

module.exports = Day;