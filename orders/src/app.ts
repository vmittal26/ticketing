import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import { UserPayload } from './model/UserPayload';

import {
  NotFoundError,
  authenticate,
  currentUser,
  errorHandler,
} from '@coretickets/modules';
import { postOrderRouter } from './routes/postOrder';
import { getOrdersRouter } from './routes/getOrders';
import { getOrderById } from './routes/getOrderById';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

const app = express();
app.set('trust proxy', 1);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use(currentUser);
app.use(authenticate);
app.use(postOrderRouter);
app.use(getOrdersRouter);
app.use(getOrderById);

app.all('*', async () => {
  throw new NotFoundError('invalid route');
});
app.use(errorHandler);

export { app };
