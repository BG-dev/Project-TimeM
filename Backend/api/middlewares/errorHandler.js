const logger = require('./logger')

function logError(err, req, res, next){
    logger.error(err)
    next(err)
}

function sendError(err, req, res, next){
    res.status(400).send({message: `${err}`})
}

module.exports = {
    logError,
    sendError
}