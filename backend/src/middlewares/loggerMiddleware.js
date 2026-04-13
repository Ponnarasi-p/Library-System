/**
 * @module loggerMiddleware
 * @desc Middleware to log incoming requests and outgoing responses.
 *       Generates a unique request ID for tracing and logs request lifecycle
 *       including start time, completion time, and duration.
 *
 * @requires uuid
 * @requires ../utils/logger
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function loggerMiddleware
 * @desc Logs request start and completion details with a unique request ID
 * @access Global Middleware
 *
 * @param {Object} req - Express request object
 * @param {string} req.method - HTTP method
 * @param {string} req.originalUrl - Request URL
 *
 * @param {Object} res - Express response object
 * @param {number} res.statusCode - HTTP response status code
 *
 * @param {Function} next - Express next middleware function
 *
 * @returns {void}
 *
 * @throws {Error} If logging fails (handled internally)
 */


const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId,
      message: "REQUEST_COMPLETED",
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      type: "REQUEST",
    });
  });

  logger.info({
    requestId,
    message: "REQUEST_START",
    method: req.method,
    url: req.originalUrl,
    type: "REQUEST",
  });

  next();
};