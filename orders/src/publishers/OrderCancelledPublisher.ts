import { BasePublisher, OrderCancelledEvent, Subjects } from '@coretickets/modules';

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelledEvent = Subjects.OrderCancelledEvent;
    
}