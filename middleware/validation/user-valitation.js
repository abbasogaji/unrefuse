const { body } = require("express-validator")
const User = require("../../model/User")


exports.userSignUpValidator = [

    body('name')
        .trim()
            .isString()
                .withMessage("Name field entered is invalid"),


    body('email')
        .trim()
            .isEmail()
                .custom( value => {
                    return User.findOne( { email: value } ).then( emailExists => {
                        if( emailExists ){
                            return Promise.reject('E-mail Already exists')
                        }
                    })
                })
                    .normalizeEmail()
                        .withMessage('E-mail is invalid'),



    body('password')
        .trim()
            .matches('^(?=.*[0-9])[a-zA-Z0-9]{6,16}$')
                .withMessage('Password must atleast be 6 characters long with atleast one number')

]