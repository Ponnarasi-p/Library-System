/**
 * @module logConstants
 * @desc Defines logging levels, message types, and operation categories
 *       used across the application for structured and consistent logging.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/** */

/**
 * @constant LOG_CONSTANTS
 * @type {Object}
 * @desc Collection of logging configurations
 *
 * @property {Object} LEVEL - Log severity levels
 * @property {string} LEVEL.INFO - Informational logs
 * @property {string} LEVEL.ERROR - Error logs
 * @property {string} LEVEL.WARN - Warning logs
 *
 * @property {Object} MESSAGE - Log message states
 * @property {string} MESSAGE.START - Indicates start of a process
 * @property {string} MESSAGE.END - Indicates completion of a process
 * @property {string} MESSAGE.ERROR - Indicates an error occurred
 *
 * @property {Object} TYPE - Operation types for logging
 * @property {string} TYPE.FETCH - Data retrieval operations
 * @property {string} TYPE.UPSERT - Create or update operations
 * @property {string} TYPE.DELETE - Delete operations
 * @property {string} TYPE.QUERY - Database query operations
 */


module.exports = {
  LEVEL: {
    INFO: "info",
    ERROR: "error",
    WARN: "warn",
  },

  MESSAGE: {
    START: "START",
    END: "END",
    ERROR: "ERROR",
  },

  TYPE: {
    FETCH: "FETCH",
    UPSERT: "UPSERT",
    DELETE: "DELETE",
    QUERY: "QUERY",
  },
};