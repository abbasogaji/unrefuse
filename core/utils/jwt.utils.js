const jwt = require("jsonwebtoken")
const generateLoginToken = (user) => {
    
    const token = jwt.sign( {
            email : user.email,
            userId : user._id, 
    }, process.env.jwtKey,
    {
        expiresIn : '1h'
    })
    return token
}

const generateMobileLoginToken = (user) => {
    
    const token = jwt.sign( {
            name : user.name,
            userId : user._id, 
    }, process.env.jwtKey)
    return token
}

const verifyLoginToken = (token) => {
    return jwt.verify(token, process.env.jwtKey);
}



module.exports = {
                    generateLoginToken : generateLoginToken,
                    generateMobileLoginToken : generateMobileLoginToken ,
                    verifyLoginToken : verifyLoginToken
                }