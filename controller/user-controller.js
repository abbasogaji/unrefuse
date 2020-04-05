const User = require("../model/User")
const { validationResult } = require('express-validator') 
const bcrypt  = require('bcryptjs')
const jwt = require("../core/utils/jwt.utils")
const appCommons = require('../app.commons')

exports.createUser = (req, res, next) => {
    const errors = validationResult(req)
    const input = req.body
    if(errors.isEmpty()){
        bcrypt.hash(input.password, 12).then(hashedPwd => {
            const user = new User({
                name : input.name,
                email : input.email,
                password : hashedPwd
            })
            return user.save()
        }).then(( user ) => {
            // const token = jwt.generateLoginToken(user)
            // console.log("asasaaa", user, token)
            return res.status(200).json({
                dataTitle: appCommons.USER_CREATED_DATA_TITLE,
                dataType : appCommons.USER_CREATED_DATA_TYPE,
                data : user
            })
        }).catch(err => {
            next(err)
        })
    }else{
        const error = new Error("Unable to Sign Up")
        error.detail = errors.array()
        throw error;
    } 
}

exports.getUserById = (req, res, next) => {
    const userId = req.params.id;
    User.findOne({_id : userId}).then(data => {
        return res.status(200).json({
            dataTitle : appCommons.USER_READ_DATA_TITLE,
            dataType : appCommons.USER_READ_DATA_TYPE,
            data : data
        })
    }).catch(err => {
        next(err)
    })
}

exports.getAllUsers = (req,res,next) => {
    User.find().then(data => {
        return res.status(200).json({
            dataTitle : appCommons.USER_READ_ALL_DATA_TITLE,
            dataType : appCommons.USER_READ_ALL_DATA_TYPE,
            data : data
        })
    }).catch(error => {
        next(error)
    })
}

exports.updateUserById = (req, res, next) => {
    const userId = req.userId;
    const input = req.body
    User.findOneAndUpdate({_id : userId}, {
        name : input.name
    }, { new : true}).then(data => {
        res.status(200).json({
            dataTitle: appCommons.USER_UPDATED_DATA_TITLE,
            dataType : appCommons.USER_UPDATED_DATA_TYPE,
            data : data
        })
    }).catch(err => {
        next(err)
    })
}

exports.deleteUserById = (req, res, next) => {
    const userId = req.params.id;

    User.findOneAndDelete({_id : userId}).then(data => {
        return res.status(200).json({
            dataTitle: appCommons.USER_DELETED_DATA_TITLE,
            dataType : appCommons.USER_DELETED_DATA_TYPE,
            data : ' User('+userId+') deleted'
        })
    }).catch(error => {
        next(error)
    })
}

exports.loginUser = (req, res, next) => {
    const errors =  validationResult(req)
    input = req.body
    if(errors.isEmpty()){
            User.findOne({ email : input.email }).then(user => {
                if(bcrypt.compareSync(input.password, user.password)){
                    return res.status(200).json({
                        access_token : jwt.generateLoginToken(user)
                    })
                }else{
                    const error = new Error('Invalid email address and password combination')
                    error.statusCode = 401;
                    error.detail = 'Invalid email address and password combination';
                    throw error;
                }
            }).catch(error => {
                next(error)
            })
    }else{
        const error = new Error("Unable to Login in")
        error.detail = errors.array()
        throw error;    
    }
}

exports.verifyEmail = (req, res, next) => {
    User.find({ email : req.body.email }).then( user => {
        console.log(user)
    })
}



