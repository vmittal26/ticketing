import express, { Request, Response } from 'express';

import * as ticketService from '../service/ticketService';
import { NotFoundError } from '@coretickets/modules';

const router = express.Router();

router.get(
  '/api/v1/tickets/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await ticketService.findTicketById(id);

    if (ticket == null) {
      throw new NotFoundError('ticket not found');
    }

    res.status(200).send(ticket);
  }
);

export { router as getTicketRouter };

