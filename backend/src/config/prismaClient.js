/**
 * @constant prisma
 * @type {PrismaClient}
 * @desc Singleton instance of Prisma Client for interacting with the database
 */
/**
 * @exports prisma
 * @desc Exporting the Prisma client instance for reuse in repositories/DAL
 */


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;