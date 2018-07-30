var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    debut:{
        type: Date,
        default: Date.now
    },
    genders:{
        type: [String],
        required: true
    },
    genders:{
        type: [String],
        required: true
    }


});

module.exports = mongoose.model('Artist', musicSchema);
