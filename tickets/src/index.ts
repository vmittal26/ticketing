import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper/NatsWrapper';
import { OrderCreatedListener } from './listeners/OrderCreatedListener';

const start = async () => {
  try {
    if (process.env.MONGO_DB_CONNECTION_STRING == null) {
      throw new Error('Mongo db instance env variable is missing');
    }
    await natsWrapper.natsConnect();

    process.on('SIGINT', () => {
      natsWrapper.client.close();
    });
    process.on('SIGTERM', () => {
      natsWrapper.client.close();
    });


    new OrderCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log('connected successfully!');

    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  } catch (error) {
    console.error((error as Error)?.message ?? 'Error while connecting db');
  }
};

start();



