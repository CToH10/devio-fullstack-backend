/* eslint-disable import/extensions */
import { z } from 'zod';
import { orderRequestSchema } from '../schemas/orders.schema';

export type OrderRequestType = z.infer<typeof orderRequestSchema>;
