import express, { Request, Response } from 'express';
import { postTicketValidator } from '../validators/postTicketValidator';

import * as ticketService from '../service/ticketService';
import { TicketCreatedPublisher } from '../publisher/TicketCreatedPublisher';
import { natsWrapper } from '../nats-wrapper/NatsWrapper';
import { validateRequest } from '@coretickets/modules';

const router = express.Router();

router.post(
  '/api/v1/tickets',
  postTicketValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await ticketService.saveTicket(
      title,
      price,
      req.currentUser.id
    );

    new TicketCreatedPublisher(natsWrapper.client).publish({
      version:ticket.version,
      id:ticket.id,
      title:ticket.title,
      price:ticket.price,
      userId:ticket.userId
    });

    res.status(201).send(ticket);
  }
);

export { router as postTickeRouter };
