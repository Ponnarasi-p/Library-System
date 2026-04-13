/**
 * @module authRepository
 * @desc Handles database operations related to user authentication.
 *       Uses Prisma ORM to interact with the user table.
 *
 * @requires ../config/prismaClient
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @function findUserByEmail
 * @desc Retrieves a user record by email address.
 *       Assumes email is a unique field in the database schema.
 *
 * @param {string} email - User email address
 *
 * @returns {Promise<Object|null>} User object if found, otherwise null
 *
 * @throws {Error} If database query fails
 */

const prisma = require("../config/prismaClient");

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ //only one user per email-email is a unique field in the database schema.
    where: { email }
  });
};