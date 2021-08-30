import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../database/user';
import { log } from '../utils/logger';
import { InternalServerError, BadRequest } from '../utils/errors';

dotenv.config();
const genToken = async (id, type) => jwt.sign(
  {
    id,
    type,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '365d',
  },
);
const formatUser = (user) => ({
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  address: user.address,
  location: user.location,
  createdAt: user.createdAt,
});

export const signup = async (payload) => {
  const { firstname, lastname, email, password, location, address } = payload;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    log.info('Creating a new user');
    const user = await new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      location,
    }).save();
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      location: user.location,
      createdAt: user.createdAt,
    };
  } catch (error) {
    log.info(`An error occured. error: ${error}`);
    throw new InternalServerError('Unable to create user. Try again later');
  }
};

export const signin = async (data) => {
  log.debug('Executing login service');
  const { email, password } = data;
  const user = await UserModel.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new BadRequest('Incorrect email or password');
  }

  const userId = user._id;

  log.debug('Creating token for this user');
  const token = await genToken(userId, 'auth');

  return {
    ...formatUser(user),
    token,
  };
};
