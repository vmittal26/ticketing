import { Message, Stan } from "node-nats-streaming";
import { Event } from "../events/Event";

export abstract class BaseListener<T extends Event> {
  protected client: Stan;
  abstract subject: string;
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }
  abstract onMessage(data: T['data'], message: Message): void;

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subScription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subScription.on("message", (message: Message) => {
      console.log(`Message ${this.subject} ${this.queueGroupName}`);

      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
