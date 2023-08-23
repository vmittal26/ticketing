import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
} from '@coretickets/modules';
import express from 'express';
import { Order } from '../model/Order';
import { Ticket } from '../model/Ticket';
import { findExistingOrderFromTicket } from '../service/orderService';
import { OrderCreatedPublisher } from '../publishers/OrderCreatedPublisher';
import { natsWrapper } from '../nats-wrapper/NatsWrapper';

const postOrderRouter = express.Router();

postOrderRouter.post('/api/v1/order', async (req, res) => {
  const { ticketId } = req.body;
  const ticket = await Ticket.findById(ticketId);

  if (ticket == null) {
    throw new NotFoundError('ticket is not found!');
  }
  const existingOrder = await findExistingOrderFromTicket(ticket);

  if (existingOrder != null) {
    throw new BadRequestError('Ticket is already reserved!');
  }
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getDate() + 15 * 60);

  const order = Order.build({
    userId: req.currentUser?.id,
    expiresAt: expirationDate,
    status: OrderStatus.Created,
    ticket,
  });

  await order.save();
  console.log('order saved!');

  new OrderCreatedPublisher(natsWrapper.client).publish({
    expiresAt: order.expiresAt.toISOString(),
    id: order.id,
    status: OrderStatus.Created,
    userId: order.userId,
    ticket: {
      id: order.ticket.id,
      price: order.ticket.price,
    },
  });

  console.log('order created event published!');

  res.status(201).send(order);
});

export { postOrderRouter };
