/**
 * @module httpStatusConstants
 * @desc Defines standard HTTP status codes used across the application
 *       for consistent API responses.
 *
 * @author Ponnnarasi
 * @date 2026-04-10
 */

/**
 * @constant HTTP_STATUS
 * @type {Object}
 * @desc Collection of commonly used HTTP status codes
 *
 * @property {number} OK - Request succeeded
 * @property {number} CREATED - Resource successfully created
 * @property {number} BAD_REQUEST - Invalid request data
 * @property {number} UNAUTHORIZED - Authentication required or failed
 * @property {number} FORBIDDEN - Access denied
 * @property {number} NOT_FOUND - Resource not found
 * @property {number} INTERNAL_SERVER_ERROR - Server encountered an error
 */



module.exports = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};