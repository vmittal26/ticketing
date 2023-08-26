import {BasePublisher , TicketCreatedEvent , Subjects} from '@coretickets/modules';

export  class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreatedEvent = Subjects.TicketCreatedEvent;

}