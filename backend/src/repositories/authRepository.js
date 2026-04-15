import prisma from '../config/prismaClient.js';

class AuthRepository {
  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default new AuthRepository();