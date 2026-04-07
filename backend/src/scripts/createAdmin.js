const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Admin created");
}

createAdmin();