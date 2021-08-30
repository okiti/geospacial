import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../database/user';

dotenv.config();

export default async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || typeof token !== 'string') {
    return res
      .status(401)
      .json({ success: false, message: 'You are not authorized to access this route.' });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, type } = decoded;

      const user = await userModel.findOne({ _id: id });
      if (!user) throw Error('');

      res.locals.user = user;
      res.locals.authType = type;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(401).json({ success: false, message: 'Unable to authenticate token' });
    }
  }

  return next();
};
