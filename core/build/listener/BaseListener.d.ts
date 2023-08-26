import { Message, Stan } from "node-nats-streaming";
import { Event } from "../events/Event";
export declare abstract class BaseListener<T extends Event> {
    protected client: Stan;
    abstract subject: string;
    abstract queueGroupName: string;
    protected ackWait: number;
    constructor(client: Stan);
    abstract onMessage(data: T['data'], message: Message): void;
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
