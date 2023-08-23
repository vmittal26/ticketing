import { OrderStatus } from "./OrderStatus";
import { Subjects } from "./Subjects";
export interface OrderCreatedEvent {
    subject: Subjects.OrderCreatedEvent;
    data: {
        id: string;
        status: OrderStatus.Created;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string;
            price: number;
        };
    };
}
