import express from 'express';
import { getUserOrders } from '../service/orderService';
const getOrdersRouter = express.Router();

getOrdersRouter.get('/api/v1/user-orders', async (req, res) => {
  const orders = await getUserOrders(req.currentUser.id);
  res.status(200).send(orders);
});

export { getOrdersRouter };
