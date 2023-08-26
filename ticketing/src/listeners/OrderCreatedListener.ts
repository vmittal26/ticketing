import {
  BaseListener,
  OrderCreatedEvent,
  Subjects,
} from '@coretickets/modules';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../model/Ticket';
import { TicketUpdatedPublisher } from '../publisher/TicketUpdatedPublisher';

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {

  subject: Subjects.OrderCreatedEvent = Subjects.OrderCreatedEvent;
  queueGroupName = 'tickets-service';

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {

    console.log('Message -> OrderCreatedEvent');
    
    const ticket = await Ticket.findById(data.ticket.id);

    if (ticket == null) {
      throw new Error('Ticket not found!');
    }
    ticket.set({ orderId: data.id });

    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id:ticket.id,
      price:ticket.price,
      title:ticket.title,
      userId:ticket.userId,
      orderId:ticket.orderId,
      version:ticket.version
    });

    message.ack();
  }
}
