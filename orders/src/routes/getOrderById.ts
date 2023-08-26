import express from 'express';
import { findOrderById } from '../service/orderService';
const getOrderById = express.Router();

getOrderById.get('/api/v1/user-orders', async (req, res) => {
  const orders = await findOrderById(req.currentUser.id);
  res.status(200).send(orders);
});

export { getOrderById };

