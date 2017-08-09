var mongoose = require('mongoose');

var FrogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    superpower: String,
})

var Frog = mongoose.model('Frog', FrogSchema);