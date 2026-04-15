import authService from '../services/authService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });

  } catch (error) {
    return next(error);
  }
};