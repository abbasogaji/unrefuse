const errorHandler = (error, req, res, next) => {

    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        ...error
    })
    
}

module.exports = errorHandler;