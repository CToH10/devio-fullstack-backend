/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  createOrderController,
  listAOrderController,
  listAllCheckoutController,
  listAllFinishedController,
  listAllOrdersController,
  listAllRefusedController,
  updateOrderControler,
} from '../controllers/orders.controller';
import { protectData } from '../middlewares/protectData.middleware';
import {
  orderRequestSchema,
  updateOrderRequestSchema,
} from '../schemas/orders.schema';

export const orderRoutes: Router = Router();

orderRoutes.post('', protectData(orderRequestSchema), createOrderController);
orderRoutes.get('', listAllOrdersController);
orderRoutes.patch(
  '/:id',
  protectData(updateOrderRequestSchema),
  updateOrderControler,
);
orderRoutes.get('/checkout', listAllCheckoutController);
orderRoutes.get('/finished', listAllFinishedController);
orderRoutes.get('/refused', listAllRefusedController);
orderRoutes.get('/:id', listAOrderController);
