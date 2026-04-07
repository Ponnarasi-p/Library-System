const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenUtil");
const authRepository = require("../repositories/authRepository");

exports.login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);

  return {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    token
  };
};