/**
 * @module notFoundMiddleware
 * @desc Middleware to handle requests for undefined routes.
 *       Logs the request and returns a standardized 404 response.
 *
 * @requires ../utils/logger
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function notFoundMiddleware
 * @desc Handles requests to routes that do not exist in the application
 * @access Global Middleware (should be placed after all routes)
 *
 * @param {Object} req - Express request object
 * @param {string} req.method - HTTP method
 * @param {string} req.originalUrl - Requested URL
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function (not used here)
 *
 * @returns {Object} 404 response with error message
 */




const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  logger.warn(`404 | ${req.method} ${req.originalUrl}`);

  res.status(404).json({
    success: false,
    message: "Route not found"
  });
};