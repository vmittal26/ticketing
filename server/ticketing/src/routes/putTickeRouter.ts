import express, { Request, Response } from 'express';

import * as ticketService from '../service/ticketService';
import { BadRequestError, NotAuthorizedUser } from '@coretickets/modules';
import { TicketUpdatedPublisher } from '../publisher/TicketUpdatedPublisher';
import { natsWrapper } from '../nats-wrapper/NatsWrapper';

const router = express.Router();

router.put('/api/v1/tickets/:id', async (req: Request, res: Response) => {
  const { title, price } = req.body;

  const { id } = req.params;

  const ticket = await ticketService.findTicketById(id);

  if (ticket?.userId !== req.currentUser.id) {
    throw new NotAuthorizedUser('User is not authrorized');
  }

  if(ticket.orderId !=null){
    throw new BadRequestError('Update on reserved ticket is not allowed');
  }
  ticket.title = title;
  ticket.price = price;

  await ticket.save();

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    version: ticket.version,
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });

  res.status(201).send(ticket);
});

export { router as putTickeRouter };
