/* eslint-disable import/extensions */
import { Router } from 'express';
import { protectData } from '../middlewares/protectData.middleware';
import { orderRequestSchema } from '../schemas/orders.schema';

export const orderRoutes: Router = Router();

orderRoutes.post('', protectData(orderRequestSchema));
