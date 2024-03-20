/* eslint-disable import/extensions */
import prisma from '../client';
import {
  OrderRequestType,
  OrderUpdateRequestType,
} from '../interfaces/orders.interfaces';
import {
  orderReturnListSchema,
  orderReturnSchema,
} from '../schemas/orders.schema';

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
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              category: true,
            },
          },
        },
      },
    },
  });

  const priceTotal = createOrder.product_orders.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0,
  );

  const returnObj = { ...createOrder, priceTotal };

  return orderReturnSchema.parse(returnObj);
};

export const listAllOrdersService = async () => {
  const list = await prisma.orders.findMany({
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              category: true,
            },
          },
        },
      },
    },
  });

  const pricedList = list.map(order => {
    const priceTotal = order.product_orders.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0,
    );

    return { ...order, priceTotal };
  });

  const parsedList = orderReturnListSchema.parse(pricedList);

  return parsedList;
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

  return orderReturnSchema.parse(updatedOrder);
};

export const listAOrderService = async (id: string) => {
  const order = await prisma.orders.findFirstOrThrow({
    where: { id },
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              category: true,
            },
          },
        },
      },
    },
  });

  const priceTotal = order.product_orders.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0,
  );

  const returnObj = { ...order, priceTotal };

  return orderReturnSchema.parse(returnObj);
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
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              description: true,
              category: true,
            },
          },
        },
      },
    },
  });

  const pricedList = list.map(order => {
    const priceTotal = order.product_orders.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0,
    );

    return { ...order, priceTotal };
  });

  const listReturn = {
    count: list.length,
    data: orderReturnListSchema.parse(pricedList),
  };

  return listReturn;
};

export const listAllFinishedService = async () => {
  const list = await prisma.orders.findMany({
    where: {
      status: 'finished',
    },
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              description: true,
              category: true,
            },
          },
        },
      },
    },
  });

  const pricedList = list.map(order => {
    const priceTotal = order.product_orders.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0,
    );

    return { ...order, priceTotal };
  });

  const listReturn = {
    count: list.length,
    data: orderReturnListSchema.parse(pricedList),
  };

  return listReturn;
};

export const listAllRefusedService = async () => {
  const list = await prisma.orders.findMany({
    where: {
      status: 'refused',
    },
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      comment: true,
      code: true,
      status: true,
      product_orders: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              cover_image: true,
              price: true,
              id: true,
              description: true,
              category: true,
            },
          },
        },
      },
      reason_of_refusal: true,
    },
  });

  const pricedList = list.map(order => {
    const priceTotal = order.product_orders.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0,
    );

    return { ...order, priceTotal };
  });

  const listReturn = {
    count: list.length,
    data: orderReturnListSchema.parse(pricedList),
  };

  return listReturn;
};
