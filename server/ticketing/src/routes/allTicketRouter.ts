import express, { Request, Response } from 'express';

import * as ticketService from '../service/ticketService';

const router = express.Router();

router.get('/api/v1/tickets', async (req: Request, res: Response) => {
  const tickets = await ticketService.findAllTickets();

  res.status(200).send(tickets);
});

export { router as allTicketRouter };
