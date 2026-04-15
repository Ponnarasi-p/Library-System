/**
 * @module messages
 * @desc Defines standardized application message constants used for
 *       API responses, error handling, and success notifications.
 *       Helps maintain consistency across controllers and services.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @constant MESSAGE_CONSTANTS
 * @type {Object}
 * @desc Collection of success and error message identifiers
 *
 * @property {string} LOGIN_SUCCESS - User login successful
 *
 * @property {string} BOOK_CREATE_SUCCESS - Book created successfully
 * @property {string} BOOK_UPDATE_SUCCESS - Book updated successfully
 * @property {string} BOOK_DELETE_SUCCESS - Book deleted successfully
 * @property {string} BOOK_FETCH_SUCCESS - Books fetched successfully
 * @property {string} BOOK_FETCH_BY_ID_SUCCESS - Single book fetched successfully
 *
 * @property {string} BOOK_ALREADY_EXISTS - Duplicate book detected
 * @property {string} BOOK_NOT_FOUND - Book not found
 * @property {string} VALIDATION_FAILED - Input validation failed
 *
 * @property {string} UNAUTHORIZED - Unauthorized access attempt
 */

const MESSAGE = {
  LOGIN_SUCCESS: 'login_success',

  BOOK_CREATE_SUCCESS: 'book_create_success',
  BOOK_UPDATE_SUCCESS: 'book_update_success',
  BOOK_DELETE_SUCCESS: 'book_delete_success',
  BOOK_FETCH_SUCCESS: 'book_fetch_success',
  BOOK_FETCH_BY_ID_SUCCESS: 'book_fetch_by_id_success',

  BOOK_ALREADY_EXISTS: 'book_already_exists',
  BOOK_NOT_FOUND: 'book_not_found',
  VALIDATION_FAILED: 'validation_failed',

  UNAUTHORIZED: 'unauthorized',
};

export default MESSAGE;