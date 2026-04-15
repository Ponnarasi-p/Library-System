import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';
import { verifyToken } from '../utils/tokenUtil.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(SYSTEM_CONSTANTS.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch  {
    return res.status(SYSTEM_CONSTANTS.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;