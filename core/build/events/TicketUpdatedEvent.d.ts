import { Subjects } from "./Subjects";
export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdatedEvent;
    data: {
        userId: string;
        version: number;
        id: string;
        title: string;
        price: number;
        orderId?: string;
    };
}
