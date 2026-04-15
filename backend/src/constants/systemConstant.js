/**
 * Base unit constants
 */
const BYTES_PER_KB = 1024;
const MAX_FILE_SIZE_MB = 2;

/**
 * System-wide constants used across the application
 * Includes HTTP codes, file size limits, and pagination defaults
 *
 * @readonly
 * @property {number} BAD_REQUEST - HTTP 400
 * @property {number} UNAUTHORIZED - HTTP 401
 * @property {number} INTERNAL_SERVER_ERROR - HTTP 500
 * @property {number} BYTE - Bytes per KB (1024)
 * @property {number} KB - Kilobytes
 * @property {number} MB - Megabytes
 * @property {number} MAX_FILE_SIZE_MB - Max file size in MB
 * @property {number} MAX_FILE_SIZE - Max file size in bytes
 * @property {number} DEFAULT_PAGE - Default pagination page
 * @property {number} DEFAULT_LIMIT - Default pagination limit
 */
export const SYSTEM_CONSTANTS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,

  FORBIDDEN_ERROR:403,
  NOT_FOUND_ERROR:404,

  PORT:5000,

  BYTE: 1024,

  MAX_FILE_SIZE_MB: 2,
  PAGINATION:5,

  KB: BYTES_PER_KB,
  MB: BYTES_PER_KB * BYTES_PER_KB,

  MAX_FILE_SIZE: MAX_FILE_SIZE_MB * BYTES_PER_KB * BYTES_PER_KB,

  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};