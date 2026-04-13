/**
 * @module roleMiddleware
 * @desc Middleware to enforce role-based access control (RBAC).
 *       Allows only users with specified roles to access certain routes.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function roleMiddleware
 * @desc Returns a middleware function that checks if the user's role
 *       is authorized to access the route.
 * @access Protected routes
 *
 * @param {Array<string>} roles - List of allowed roles (e.g., ["ADMIN"])
 *
 * @returns {Function} Express middleware function
 *
 * @throws {Error} If user role is not authorized
 */

module.exports = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};