"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListener = void 0;
class BaseListener {
    constructor(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subScription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subScription.on("message", (message) => {
            console.log(`Message ${this.subject} ${this.queueGroupName}`);
            const parsedData = this.parseMessage(message);
            this.onMessage(parsedData, message);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf-8"));
    }
}
exports.BaseListener = BaseListener;
