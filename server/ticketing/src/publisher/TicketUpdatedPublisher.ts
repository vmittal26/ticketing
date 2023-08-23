import {BasePublisher , TicketUpdatedEvent , Subjects} from '@coretickets/modules';

export  class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdatedEvent = Subjects.TicketUpdatedEvent;

}