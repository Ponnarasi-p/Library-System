import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';

const roleMiddleware = roles => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(SYSTEM_CONSTANTS.UNAUTHORIZED).json({
        code: SYSTEM_CONSTANTS.UNAUTHORIZED,
        status: 'error',
        message: 'Unauthorized',
        description: 'User information missing',
        data: [],
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(SYSTEM_CONSTANTS.FORBIDDEN_ERROR).json({
        code: SYSTEM_CONSTANTS.FORBIDDEN_ERROR,
        status: 'error',
        message: 'Access denied',
        description: `Role '${req.user.role}' is not permitted`,
        data: [],
      });
    }

    return next();
  };
};

export default roleMiddleware;