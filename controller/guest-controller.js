const Guest = require("../model/Guest")
const { validationResult } = require('express-validator') 
const bcrypt  = require('bcryptjs')
const jwt = require("../core/utils/jwt.utils")
const appCommons = require('../app.commons')

exports.createGuest = (req, res, next) => {
    const errors = validationResult(req)
    const input = req.body
    if(errors.isEmpty()){
        
        const guest = new Guest({

            name : input.name,
            deviceId : input.deviceId,
            location : input.location,

        })
        guest.save().then( guest => {
            const token = jwt.generateMobileLoginToken(guest)
            return res.status(200).json({
                access_token : token
            })
        }).catch(error => {
            next(error)
        })
        
    }else{
        const error = new Error("Unable to Sign Up")
        error.detail = errors.array()
        throw error;
    } 
}

exports.getGuestById = (req, res, next) => {
    const userId = req.params.id;
    Guest.findOne({_id : userId}).then(data => {
        return res.status(200).json({
            dataTitle : appCommons.GUEST_READ_DATA_TITLE,
            dataType : appCommons.GUEST_READ_DATA_TYPE,
            data : data
        })
    }).catch(err => {
        next(err)
    })
}

exports.getAllGuest = (req,res,next) => {
    User.find().then(data => {
        return res.status(200).json({
            dataTitle : appCommons.GUEST_READ_ALL_DATA_TITLE,
            dataType : appCommons.GUEST_READ_ALL_DATA_TYPE,
            data : data
        })
    }).catch(error => {
        next(error)
    })
}



