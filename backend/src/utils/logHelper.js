import logger from './logger.js';
import LOG from '../constants/logConstants.js';

export const logInfo = (functionName, message, requestId, type, extra = {}) => {
  logger.log({
    level: LOG.LEVEL.INFO,
    functionName,
    message,
    requestId,
    type,
    ...extra,
  });
};

export const logError = (functionName, error, requestId, type) => {
  logger.log({
    level: LOG.LEVEL.ERROR,
    functionName,
    message: error.message || LOG.MESSAGE.ERROR,
    requestId,
    type,
    stack: error.stack,
  });
};

export const logWarn = (functionName, message, requestId, type) => {
  logger.log({
    level: LOG.LEVEL.WARN,
    functionName,
    message,
    requestId,
    type,
  });
};