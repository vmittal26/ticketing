import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';


import { UserPayload } from './model/UserPayload';
import { getTicketRouter } from './routes/getTicketRouter';
import { postTickeRouter } from './routes/postTickeRouter';
import { allTicketRouter } from './routes/allTicketRouter';
import { putTickeRouter } from './routes/putTickeRouter';
import { NotFoundError, authenticate, currentUser, errorHandler } from '@coretickets/modules';

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

app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV ==='production'
}));

app.use(currentUser);
app.use(authenticate);
app.use(postTickeRouter);
app.use(getTicketRouter);
app.use(allTicketRouter);
app.use(putTickeRouter);

app.all('*', async () => {
   throw new NotFoundError('invalid route');
});
app.use(errorHandler);

export {app};