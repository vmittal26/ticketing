import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (this._client == null) {
      throw new Error('nats client is not created');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      this._client?.on('connect', () => {
        console.log('NATS connected');
        resolve('NATS connected');
      });
      this._client?.on('error', (err) => {
        console.log('Error while connecting to NATS');
        reject(err);
      });
    });
  }
  
   async natsConnect(){

    if (process.env.NATS_CLIENT_ID == null) {
      throw new Error('NATS_CLIENT_ID env variable is missing');
    }
    if (process.env.NATS_URL == null) {
      throw new Error('NATS_URL env variable is missing');
    }
    if (process.env.NATS_CLUSTER_ID == null) {
      throw new Error('NATS_CLUSTER_ID instance env variable is missing');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
  
    natsWrapper.client.on('close', () => {
      console.log('connection closed');
      process.exit();
    });
  
    process.on('SIGINT', () => {
      natsWrapper.client.close();
    });
    process.on('SIGTERM', () => {
      natsWrapper.client.close();
    });
  }
}

export const natsWrapper = new NatsWrapper();
