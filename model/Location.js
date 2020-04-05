const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    geolocation : {
        longitude : {
            type: Number,
            required : true
        },

        latitude : {
            type: Number,
            required : true 
        }
    },

    alias : {
        type : String,
        required : true
    },

    zipcode : {

    }


}, {
    timestamps : false
})

module.exports = mongoose.model('Location', locationSchema)