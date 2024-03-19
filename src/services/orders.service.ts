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
        create: {
          quantity: products[0].quantity,
          product_id: products[0].products_id,
        },
      },
    },
  });

  return createOrder;
};

export const listAllOrdersService = async () => {
  const list = await prisma.orders.findMany();

  return list;
};
