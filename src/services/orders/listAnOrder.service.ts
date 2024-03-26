import { prodSelect } from '.';
import prisma from '../../client';
import { orderReturnSchema } from '../../schemas/orders.schema';

export const listAnOrderService = async (id: string) => {
  const order = await prisma.orders.findFirstOrThrow({
    where: { id },
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      code: true,
      status: true,
      product_orders: prodSelect,
    },
  });

  const additionalsTotal = order.product_orders
    .map(od => {
      return {
        additionals: od.additionals
          .map(add => add.additional.price)
          .reduce((acc, curr) => acc + curr, 0),
        quantity: od.quantity,
      };
    })
    .map(total => total.additionals * total.quantity)
    .reduce((acc, curr) => acc + curr);

  const priceTotal =
    order.product_orders.reduce(
      (acc: number, curr) => acc + curr.quantity * curr.product.price,
      0,
    ) + additionalsTotal;

  const returnObj = { ...order, priceTotal };

  return orderReturnSchema.parse(returnObj);
};
