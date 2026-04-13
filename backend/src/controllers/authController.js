/**
 * @module authController
 * @desc Handles authentication-related HTTP requests such as user login.
 *
 * @requires ../services/authService
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function login
 * @desc Authenticates a user using email and password,
 *       and returns a token or user data on success.
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If authentication fails or service throws an error
 */

const authService = require("../services/authService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};