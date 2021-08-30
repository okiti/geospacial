import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config/vars';
import { log } from '../utils/logger';

dotenv.config();

const dbUrl = config.dbUrl[config.env];
export default async () => {
  try {
    log.info(`Start setting up database for ${config.env} environment`);
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise;
    log.info('Finished setting up database');
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      log.error('Unable to connect to database .... .. .. .. ..');
    } else {
      log.error(error);
    }
  }
};
