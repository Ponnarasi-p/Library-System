const prisma = require("../config/prismaClient");

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ //only one user per email-email is a unique field in the database schema.
    where: { email }
  });
};