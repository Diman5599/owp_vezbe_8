const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
   // new winston.transports.Console(), //moglo bi i na konzolu
    new winston.transports.File({
      filename: 'app.log',
    })
  ],
});

const requestLog = (req, res, next) => {
    logger.info(req.body)
    next()
}

module.exports = {
    requestLog: requestLog
}