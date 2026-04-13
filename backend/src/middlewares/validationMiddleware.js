/**
 * @module validationMiddleware
 * @desc Middleware to handle validation results from express-validator.
 *       If validation errors exist, it forwards a structured error to
 *       the global error handler.
 *
 * @requires express-validator
 * @requires ../constants/httpStatusConstants
 * @requires ../constants/messages
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function validationMiddleware
 * @desc Checks validation results and passes errors to error middleware if any
 * @access Protected / Internal Middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {void}
 *
 * @throws {Object} Custom error object with status, message, and description
 */



const { validationResult } = require("express-validator");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({
      status: HTTP.BAD_REQUEST,
      message: MESSAGE.VALIDATION_FAILED,
      description: errors.array()[0].msg,
    });
  }

  next();
};