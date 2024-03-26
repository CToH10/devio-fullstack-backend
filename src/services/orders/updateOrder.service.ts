import { prodSelect } from '.';
import prisma from '../../client';
import { AppError } from '../../errors';
import { OrderUpdateRequestType } from '../../interfaces/orders.interfaces';
import { orderReturnSchema } from '../../schemas/orders.schema';
import { listAnOrderService } from './listAnOrder.service';

export const updateOrderService = async (
  requestData: OrderUpdateRequestType,
  id: string,
) => {
  const { status, client } = requestData;
  const clientOrder = await (await listAnOrderService(id)).client;
  if (
    status === 'preparing' &&
    !client &&
    status === 'preparing' &&
    !clientOrder
  ) {
    throw new AppError('Necessário informar nome do cliente');
  }
  const data = client
    ? {
        reason_of_refusal: requestData.reason_of_refusal || null,
        status,
        client,
      }
    : {
        reason_of_refusal: requestData.reason_of_refusal || null,
        status,
      };

  const updatedOrder = await prisma.orders.update({
    where: { id },
    data,
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

  const additionalsTotal = updatedOrder.product_orders
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
    updatedOrder.product_orders.reduce(
      (acc: number, curr) => acc + curr.quantity * curr.product.price,
      0,
    ) + additionalsTotal;

  const returnObj = { ...updatedOrder, priceTotal };

  return orderReturnSchema.parse(returnObj);
};
