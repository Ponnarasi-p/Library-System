const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenUtil");
const authRepository = require("../repositories/authRepository");

exports.login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw {
      status: 400,
      message: "invalid_email",
      description: "Email not registered",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw {
      status: 400,
      message: "invalid_password",
      description: "Incorrect password",
    };
  }

  const token = generateToken(user);

  return {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    token,
  };
};