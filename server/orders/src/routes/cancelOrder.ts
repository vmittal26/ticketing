import {
  NotAuthorizedUser,
  NotFoundError,
  OrderStatus,
} from '@coretickets/modules';
import express from 'express';
import { Order } from '../model/Order';
import { OrderCancelledPublisher } from '../publishers/OrderCancelledPublisher';
import { natsWrapper } from '../nats-wrapper/NatsWrapper';
const cancelOrderRouter = express.Router();

cancelOrderRouter.delete('/api/v1/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('ticket');
  if (order == null) {
    throw new NotFoundError('ticket is not found!');
  }
  if (order.userId !== req.currentUser.id) {
    throw new NotAuthorizedUser('User is not authorized');
  }
  order.status = OrderStatus.Cancelled;

  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    status: OrderStatus.Cancelled,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export { cancelOrderRouter };
