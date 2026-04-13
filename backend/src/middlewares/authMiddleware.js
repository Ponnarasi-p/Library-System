/**
 * @module authMiddleware
 * @desc Middleware to authenticate requests using JWT token.
 *       Extracts token from Authorization header, verifies it,
 *       and attaches decoded user data to the request object.
 *
 * @requires ../utils/tokenUtil
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function authMiddleware
 * @desc Validates JWT token from Authorization header
 * @access Protected routes
 *
 * @param {Object} req - Express request object
 * @param {Object} req.headers - Request headers
 * @param {string} req.headers.authorization - Bearer token (e.g., "Bearer <token>")
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {void}
 *
 * @throws {Error} If token is missing or invalid
 */


const { verifyToken } = require("../utils/tokenUtil");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};