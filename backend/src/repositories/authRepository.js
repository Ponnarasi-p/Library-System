const prisma = require("../config/prismaClient");

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};