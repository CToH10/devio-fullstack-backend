import { z } from 'zod';

export const orderRequestSchema = z.object({
  client: z.string().max(120),
  products: z.array(
    z.object({ products_id: z.string(), quantity: z.number().min(0).int() }),
  ),
});

export const orderReturnSchema = orderRequestSchema
  .extend({
    id: z.string().uuid(),
    created_at: z.string().datetime().or(z.date()),
    updated_at: z.string().datetime().or(z.date()),
    reason_of_refusal: z.string().optional(),
    product_orders: z.array(
      z.object({
        product: z.object({
          id: z.string().uuid(),
          name: z.string(),
          description: z.string().optional(),
          cover_image: z.string(),
          category: z.string(),
          price: z.number(),
        }),
        quantity: z.number().min(0).int(),
      }),
    ),
    priceTotal: z.number(),
  })
  .omit({ products: true });

export const updateOrderRequestSchema = z.object({
  status: z.enum(['ready', 'finished', 'preparing', 'refused']),
  reason_of_refusal: z.string().max(140).optional(),
});

export const orderReturnListSchema = z.array(orderReturnSchema);
