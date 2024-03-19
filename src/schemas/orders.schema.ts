import { z } from 'zod';

export const orderRequestSchema = z.object({
  client: z.string().max(120),
  products_id: z.array(z.object({ id: z.string() })),
});

export const orderReturnSchema = orderRequestSchema.extend({
  id: z.string().uuid(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
  reason_of_refusal: z.string().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      cover_image: z.string(),
      category: z.string(),
      price: z.number().int(),
    }),
  ),
});
