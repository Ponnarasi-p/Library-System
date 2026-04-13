/**
 * @module controllerHelper
 * @desc Provides utility functions to build standardized responses
 *       for controller/service operations.
 *
 * @requires ../constants/httpStatusConstants
 * @requires ../constants/messages
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function buildUpsertResponse
 * @desc Builds a standardized response object for create/update operations
 *       based on whether an ID is present.
 *
 * @param {number|string|null} id - Book ID (null/undefined for create, value for update)
 *
 * @returns {Object} Response object
 * @returns {number} returns.statusCode - HTTP status code (201 for create, 200 for update)
 * @returns {string} returns.message - Success message (create/update)
 *
 * @example
 * // Create
 * buildUpsertResponse(null)
 * // => { statusCode: 201, message: "book_create_success" }
 *
 * @example
 * // Update
 * buildUpsertResponse(5)
 * // => { statusCode: 200, message: "book_update_success" }
 */

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

exports.buildUpsertResponse = (id) => {
  return {
    statusCode: id ? HTTP.OK : HTTP.CREATED,
    message: id
      ? MESSAGE.BOOK_UPDATE_SUCCESS
      : MESSAGE.BOOK_CREATE_SUCCESS,
  };
};