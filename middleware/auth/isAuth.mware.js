const jwt  = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    if(!req.get('Authorization')){
        error =  new Error("Not Authorized")
        error.detail = 'Not Authorized';
        error.statusCode  = 403
        throw error
    }
    const token = req.get('Authorization').split(' ')[1]
    // it returns error if token could not be decoded and if token has expired
    jwt.verify(token, process.env.jwtKey, (err, decodedToken) => {
            if(err) {
                error = new Error("Invalid Authentication")
                error.detail = 'Invalid Authentication';
                error.statusCode = 422;
                throw error;
            }else{
                req.isAuth = true;
                req.userId = decodedToken.userId;
                next()
            }
    })
}
module.exports = isAuth;