import { Ticket } from '../model/Ticket';

export const saveTicket = async (
  title: string,
  price: number,
  userId: string
) => {

  try {
    console.log('creating ticket for user...', userId);

    const ticket = Ticket.build({ title, price, userId });
    const ticketDoc = await ticket.save();

    console.log('ticket is saved successfully');
    return ticketDoc;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const findTicketById = async (id: string) => {
  try {
    console.log('finding ticket for id', id);

    const ticketDoc = await Ticket.findById(id);

    console.log('ticket is returned successfully');
    return ticketDoc;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const findAllTickets = async () => {
  try {
    console.log('finding  tickets');

    const ticketDoc = await Ticket.find({});

    console.log('all ticket are returned successfully');
    return ticketDoc;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
