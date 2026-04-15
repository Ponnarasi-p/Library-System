const prisma = require('../config/prismaClient');
const bcrypt = require('bcrypt');
const { SYSTEM_CONSTANTS } = require('../constants/systemConstant');

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', SYSTEM_CONSTANTS.DEFAULT_LIMIT);

  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Admin created');
}

createAdmin();