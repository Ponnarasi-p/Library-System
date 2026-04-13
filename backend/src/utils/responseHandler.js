/**
 * @module responseHandler
 * @desc Provides utility functions to send standardized API responses
 *       for both success and error cases.
 *
 * @requires ../constants/httpStatusConstants
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function successResponse
 * @desc Sends a standardized success response
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 200, 201)
 * @param {string} message - Success message
 * @param {Array|Object} [data=[]] - Response data payload
 * @param {Object} [meta={}] - Additional metadata (pagination, etc.)
 *
 * @returns {Object} JSON response
 *
 * @example
 * successResponse(res, 200, "Books fetched", data, { total: 10 })
 */

/**
 * @function errorResponse
 * @desc Sends a standardized error response
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 400, 500)
 * @param {string} message - Error message
 * @param {string} description - Detailed error description
 *
 * @returns {Object} JSON response
 *
 * @example
 * errorResponse(res, 400, "Validation failed", "Title is required")
 */


const HTTP = require("../constants/httpStatusConstants");

exports.successResponse = (
  res,
  statusCode,
  message,
  data = [],
  meta = {}
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "success",
    message,
    data,
    meta,
  });
};

exports.errorResponse = (
  res,
  statusCode,
  message,
  description
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "error",
    message,
    description,
    data: [],
  });
};