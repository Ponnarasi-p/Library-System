const logger = require("./logger");
const LOG = require("../constants/logConstants");

// COMMON LOGGER FUNCTION
exports.logInfo = (functionName, message, requestId, type, extra = {}) => {
  logger.log({
    level: LOG.LEVEL.INFO,
    functionName,
    message,
    requestId,
    type,
    ...extra,
  });
};

exports.logError = (functionName, error, requestId, type) => {
  logger.log({
    level: LOG.LEVEL.ERROR,
    functionName,
    message: error.message || LOG.MESSAGE.ERROR,
    requestId,
    type,
    stack: error.stack,
  });
};

exports.logWarn = (functionName, message, requestId, type) => {
  logger.log({
    level: LOG.LEVEL.WARN,
    functionName,
    message,
    requestId,
    type,
  });
};