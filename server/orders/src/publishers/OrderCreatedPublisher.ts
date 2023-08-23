import { BasePublisher, OrderCreatedEvent, Subjects } from '@coretickets/modules';

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreatedEvent = Subjects.OrderCreatedEvent;
    
}