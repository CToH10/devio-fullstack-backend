import { z } from 'zod';

export const orderRequestSchema = z.object({
  client: z.string().max(120).default('Nome não informado').nullable(),
  products: z.array(
    z.object({
      products_id: z.string(),
      quantity: z.number().min(0).int(),
      comment: z.string().max(200).nullish(),
      additionals: z.array(z.string().max(50)).nullish(),
    }),
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
        comment: z.string().max(200).nullish(),
        additionals: z
          .array(
            z.object({
              additional: z.object({
                name: z.string().max(50),
                price: z.number().int(),
              }),
            }),
          )
          .nullish(),
      }),
    ),
    priceTotal: z.number(),
    code: z.number().int(),
    status: z.string(),
  })
  .omit({ products: true });

export const updateOrderRequestSchema = z.object({
  status: z.enum(['ready', 'finished', 'preparing', 'refused']),
  reason_of_refusal: z.string().max(140).optional(),
  client: z.string().max(120).nullable().default(''),
});

export const orderReturnListSchema = z.array(orderReturnSchema);
