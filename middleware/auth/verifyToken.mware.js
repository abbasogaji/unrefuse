const jwt  = require('jsonwebtoken')
const verifyToken = (req,res,next) => {
    const token = req.body.token;

    // it returns error if token could not be decoded and if token has expired
    jwt.verify(token, process.env.jwtKey, (err, decodedToken) => {
            if(err) {
                error = new Error("Invalid Authentication")
                error.detail = 'Invalid Authentication';
                error.statusCode = 422;
                throw error;
            }else{
                res.status(200).json({
                    status : true
                })
            }
    })
}
module.exports = verifyToken;