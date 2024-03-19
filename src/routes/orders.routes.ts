/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  createOrderController,
  listAllOrdersController,
} from '../controllers/orders.controller';
import { protectData } from '../middlewares/protectData.middleware';
import { orderRequestSchema } from '../schemas/orders.schema';

export const orderRoutes: Router = Router();

orderRoutes.post('', protectData(orderRequestSchema), createOrderController);
orderRoutes.get('', listAllOrdersController);
