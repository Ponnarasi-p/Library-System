/**
 * @module logHelper
 * @desc Provides helper functions for structured logging using the centralized
 *       Winston logger. Supports info, error, and warning logs with consistent format.
 *
 * @requires ./logger
 * @requires ../constants/logConstants
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function logInfo
 * @desc Logs informational messages with structured format
 *
 * @param {string} functionName - Name of the function where log is triggered
 * @param {string} message - Log message
 * @param {string} requestId - Unique request identifier
 * @param {string} type - Operation type (FETCH, UPSERT, DELETE, etc.)
 * @param {Object} [extra={}] - Additional metadata (optional)
 *
 * @returns {void}
 */
/**
 * @function logError
 * @desc Logs error messages with stack trace for debugging
 *
 * @param {string} functionName - Name of the function where error occurred
 * @param {Error|Object} error - Error object
 * @param {string} requestId - Unique request identifier
 * @param {string} type - Operation type
 *
 * @returns {void}
 */

/**
 * @function logWarn
 * @desc Logs warning messages for non-critical issues
 *
 * @param {string} functionName - Name of the function
 * @param {string} message - Warning message
 * @param {string} requestId - Unique request identifier
 * @param {string} type - Operation type
 *
 * @returns {void}
 */



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