import {
  BaseListener,
  Subjects,
  TicketCreatedEvent,
} from '@coretickets/modules';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../model/Ticket';

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  subject: Subjects.TicketCreatedEvent = Subjects.TicketCreatedEvent;
  queueGroupName = 'orders-service';

  
  async onMessage(data: TicketCreatedEvent['data'], message: Message) {

    console.log('Message -> TicketCreatedEvent');
    const { id,   title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    message.ack();
  }
}
