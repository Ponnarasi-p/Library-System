/**
 * @module tokenUtil
 * @desc Utility functions for generating and verifying JSON Web Tokens (JWT)
 *       used for authentication and authorization.
 *
 * @requires jsonwebtoken
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function generateToken
 * @desc Generates a JWT token for an authenticated user
 *
 * @param {Object} user - User object
 * @param {number} user.user_id - User ID
 * @param {string} user.role - User role (e.g., ADMIN, USER)
 *
 * @returns {string} Signed JWT token
 *
 * @throws {Error} If token generation fails
 */
/**
 * @function verifyToken
 * @desc Verifies a JWT token and decodes its payload
 *
 * @param {string} token - JWT token
 *
 * @returns {Object} Decoded token payload (userId, role, etc.)
 *
 * @throws {Error} If token is invalid or expired
 */


const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { userId: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};