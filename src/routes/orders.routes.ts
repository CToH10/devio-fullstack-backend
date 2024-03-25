/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  createOrderController,
  deleteAnOrderController,
  listAllCheckoutController,
  listAllFinishedController,
  listAllOrdersController,
  listAllRefusedController,
  listAnOrderController,
  updateOrderControler,
} from '../controllers/orders.controller';
import { ensureAdditionalExists } from '../middlewares/ensureAdditionalExists.middleware';
import { ensureOrderExists } from '../middlewares/ensureOrderExists.middleware';
import { ensureProductExists } from '../middlewares/ensureProductExists.middleware';
import { protectData } from '../middlewares/protectData.middleware';
import {
  orderRequestSchema,
  updateOrderRequestSchema,
} from '../schemas/orders.schema';

export const orderRoutes: Router = Router();

orderRoutes.post(
  '',
  protectData(orderRequestSchema),
  ensureProductExists,
  ensureAdditionalExists,
  createOrderController,
);
orderRoutes.get('', listAllOrdersController);
orderRoutes.patch(
  '/:id',
  protectData(updateOrderRequestSchema),
  ensureOrderExists,
  updateOrderControler,
);
orderRoutes.get('/checkout', listAllCheckoutController);
orderRoutes.get('/finished', listAllFinishedController);
orderRoutes.get('/refused', listAllRefusedController);
orderRoutes.get('/:id', ensureOrderExists, listAnOrderController);
orderRoutes.delete('/:id', ensureOrderExists, deleteAnOrderController);
