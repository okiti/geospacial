import express from 'express';
import uuid from 'uuid/v4';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { log } from '../utils/logger';
import routes from '../routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 1000,
});

app.use(limiter);


app.use((req, res, next) => {
  const reqId = uuid();
  res.locals.log = log.child({ reqId });
  next();
});

const corsOption = {
  origin: '*',
};
app.options('*', cors());
app.use(cors(corsOption));

app.use('/', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const path = req.route ? req.route.path : null;
  log.error(`Error processing request for route: ${req.method} ${path}`);
  log.error(err);
  const code = 500;
  const message = 'Unable to complete operation.';

  return res.status(code).json({ success: false, message });
});

app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

export default app;
