const logger = require('./logger')

function logInfo(msg, req, res, next){
    logger.info(msg)
    next(msg)
}

function sendInfo(msg, req, res, next){
    res.status(201).send({message: `${msg}`})
}

module.exports = {
    logError,
    sendError
}