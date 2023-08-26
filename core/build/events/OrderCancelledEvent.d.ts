import { OrderStatus } from "./OrderStatus";
import { Subjects } from "./Subjects";
export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelledEvent;
    data: {
        id: string;
        status: OrderStatus.Cancelled;
        ticket: {
            id: string;
        };
    };
}
