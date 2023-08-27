import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import {
  NotFoundError,
  currentUser,
  authenticate,
  errorHandler,
  UserPayload,
} from '@coretickets/modules';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

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

app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUser);
app.use(authenticate);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError('invalid route');
});
app.use(errorHandler);

const start = async () => {
  try {
    if (process.env.MONGO_DB_CONNECTION_STRING == null) {
      throw new Error('Mongo db instance env variable is missing');
    }
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log('connected successfully!');

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error((error as Error)?.message ?? 'Error while connecting db');
  }
};

start();
