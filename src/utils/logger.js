import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import expressRequestsLogger from 'express-requests-logger';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV } = process.env;

const formatOut = bformat({ outputMode: 'short' });

export const log = bunyan.createLogger({
  name: process.env.APP_NAME,
  level: process.env.LOG_LEVEL,
  stream: formatOut,
});

// Mute logging in test environment.
if (NODE_ENV === 'test') {
  log.level(bunyan.FATAL + 1);
}

export const logMiddleware = (logger) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  expressRequestsLogger({
    logger,
    request: {
      maskBody: ['password'],
      maskHeaders: ['authorization', 'token', 'auth-token'],
    },
    response: {
      maskHeaders: ['authorization', 'token', 'auth-token'],
    },
  });
