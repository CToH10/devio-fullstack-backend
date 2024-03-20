/* eslint-disable import/extensions */
import { z } from 'zod';
import {
  orderRequestSchema,
  updateOrderRequestSchema,
} from '../schemas/orders.schema';

export type OrderRequestType = z.infer<typeof orderRequestSchema>;

export type OrderUpdateRequestType = z.infer<typeof updateOrderRequestSchema>;
