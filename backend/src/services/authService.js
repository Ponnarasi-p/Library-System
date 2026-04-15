import bcrypt from 'bcrypt';
import { generateToken } from '../utils/tokenUtil.js';
import authRepository from '../repositories/authRepository.js';

import LOG from '../constants/logConstants.js';
import { logInfo, logError } from '../utils/logHelper.js';

class AuthService {
  async login(email, password, requestId) {
    const FN = 'login';
    const TYPE = LOG.TYPE.QUERY;

    try {
      logInfo(FN, LOG.MESSAGE.START, requestId, TYPE);

      // Find user
      const user = await authRepository.findUserByEmail(email);

      if (!user) {
        throw {
          status: 400,
          message: 'invalid_email',
          description: 'Email not registered',
        };
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw {
          status: 400,
          message: 'invalid_password',
          description: 'Incorrect password',
        };
      }

      // Generate token
      const token = generateToken(user);

      logInfo(FN, LOG.MESSAGE.END, requestId, TYPE);

      return {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        token,
      };

    } catch (error) {
      logError(FN, error, requestId, TYPE);
      throw error;
    }
  }
}

// ✅ IMPORTANT
export default new AuthService();