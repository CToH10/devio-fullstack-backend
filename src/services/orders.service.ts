/* eslint-disable import/extensions */
import prisma from '../client';
import {
  OrderRequestType,
  OrderUpdateRequestType,
} from '../interfaces/orders.interfaces';

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

export const updateOrderService = async (
  data: OrderUpdateRequestType,
  id: string,
) => {
  const updatedOrder = await prisma.orders.update({
    where: { id },
    data: {
      reason_of_refusal: data.reason_of_refusal || null,
      status: data.status,
    },
  });

  return updatedOrder;
};

export const listAOrderService = async (id: string) => {
  const order = await prisma.orders.findFirst({ where: { id } });

  return order;
};

export const listAllUnfinishedService = async () => {
  const list = await prisma.orders.findMany({
    where: {
      status: { not: 'finished' },
    },
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

  const listReturn = {
    count: list.length,
    data: list,
  };

  return listReturn;
};
// list all not finished
// list all finished
// list refused
