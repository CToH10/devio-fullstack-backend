/* eslint-disable import/extensions */
import prisma from '../client';
import { OrderRequestType } from '../interfaces/orders.interfaces';

export const createOrderService = async (data: OrderRequestType) => {
  const { client, products } = data;

  const idList = products.map(prod => prod.products_id);

  const createOrder = await prisma.orders.create({
    data: {
      client,
      products_id: idList,
      product_orders: {
        createMany: {
          data: products.map(prod => {
            return {
              product_id: prod.products_id,
              quantity: prod.quantity,
            };
          }),
        },
      },
    },
  });

  return createOrder;
};

export const listAllOrdersService = async () => {
  const list = await prisma.orders.findMany({
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: { name: true, cover_image: true, price: true, id: true },
          },
        },
      },
    },
  });

  return list;
};
