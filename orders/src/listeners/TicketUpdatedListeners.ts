import {
  BaseListener,
  Subjects,
  TicketUpdatedEvent,
} from '@coretickets/modules';
import { Message } from 'node-nats-streaming';
import { findByIdAndVersion } from '../service/ticketService';

export class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdatedEvent = Subjects.TicketUpdatedEvent;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketUpdatedEvent['data'], message: Message) {
    const { id, title, price, version , orderId } = data;

    console.log('Message -> TicketUpdatedEvent');

    const ticket = await findByIdAndVersion({id , version});
    if (ticket == null) {
      throw new Error('Ticket not found!');
    }

    ticket.set({
      title,
      price,
      orderId
    });

    await ticket.save();

    message.ack();
  }
}
