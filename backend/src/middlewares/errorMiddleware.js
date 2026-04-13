/**
 * @module errorMiddleware
 * @desc Global error handling middleware to catch and process all errors
 *       occurring in the application. Logs error details and returns
 *       a standardized error response.
 *
 * @requires ../constants/httpStatusConstants
 * @requires ../constants/messages
 * @requires ../utils/logger
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @function errorMiddleware
 * @desc Handles application errors, logs them, and sends a structured response
 * @access Global Middleware
 *
 * @param {Error} err - Error object
 * @param {string} err.message - Error message
 * @param {number} [err.status] - HTTP status code (optional)
 * @param {string} [err.description] - Additional error description (optional)
 *
 * @param {Object} req - Express request object
 * @param {string} req.originalUrl - Requested URL
 * @param {string} req.method - HTTP method
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} Standardized error response
 *
 * @throws {Error} Passes error to Express if unhandled (implicit)
 */


const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");
const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  return res.status(err.status || HTTP.INTERNAL_SERVER_ERROR).json({
    code: err.status || HTTP.INTERNAL_SERVER_ERROR,
    status: "error",
    message: err.message || MESSAGE.INTERNAL_ERROR,
    description: err.description || "Something went wrong",
    data: [],
  });
};