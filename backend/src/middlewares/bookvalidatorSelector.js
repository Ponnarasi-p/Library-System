/**
 * @module bookValidatorSelector
 * @desc Middleware to dynamically select and execute appropriate validators
 *       (create or update) based on request data.
 *
 * @requires ../validators/bookValidator
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function bookValidatorSelector
 * @desc Chooses validation rules based on presence of book ID.
 *       - If `id` exists → update validation
 *       - If `id` does not exist → create validation
 *
 * @access Protected / Internal Middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing book data
 * @param {string|number} [req.body.id] - Book ID (optional)
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If validation execution fails
 */



const {
  bookCreateValidator,
  bookUpdateValidator
} = require("../validators/bookValidator");

module.exports = async (req, res, next) => {
  try {
    const validators = req.body.id
      ? bookUpdateValidator
      : bookCreateValidator;

    await Promise.all(validators.map(v => v.run(req)));

    next();
  } catch (err) {
    next(err);
  }
};