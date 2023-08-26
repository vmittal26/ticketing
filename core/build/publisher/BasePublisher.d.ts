import { Stan } from "node-nats-streaming";
import { Event } from "../events/Event";
export declare abstract class BasePublisher<T extends Event> {
    abstract subject: T["subject"];
    protected client: Stan;
    constructor(client: Stan);
    publish(data: T["data"]): Promise<void>;
}
