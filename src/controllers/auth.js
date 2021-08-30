import * as authService from '../services/auth';

export const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(200).json({
      success: true,
      message: 'Registration successful',
      result: user,
    });
  } catch (error) {
    res.status(error.httpCode).json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await authService.signin(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      result: user,
    });
  } catch (error) {
    console.log(error);
    res.status(error.httpCode || 400).json({ success: false, message: error.message });
  }
};
