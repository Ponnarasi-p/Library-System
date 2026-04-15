/**
 * @module roles
 * @desc Defines user role constants used for role-based access control (RBAC)
 *       across the application.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @constant ROLE_CONSTANTS
 * @type {Object}
 * @desc Collection of user roles
 *
 * @property {string} ADMIN - Represents admin users with elevated privileges
 * @property {string} USER - Represents regular users with limited access
 */

const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export default ROLES;