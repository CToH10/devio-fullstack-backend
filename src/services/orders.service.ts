/* eslint-disable import/extensions */
import prisma from '../client';
import { AppError } from '../errors';
import {
  OrderRequestType,
  OrderUpdateRequestType,
} from '../interfaces/orders.interfaces';
import {
  orderReturnListSchema,
  orderReturnSchema,
} from '../schemas/orders.schema';

const prodSelect = {
  select: {
    id: true,
    quantity: true,
    comment: true,
    product: {
      select: {
        name: true,
        cover_image: true,
        price: true,
        id: true,
        category: true,
      },
    },
    additionals: {
      select: {
        additional: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    },
  },
};

export const createOrderService = async (data: OrderRequestType) => {
  const { client, products } = data;

  const idList = products.map(prod => prod.products_id);

  const productOrderData = products.map(prod => {
    return {
      product_id: prod.products_id,
      quantity: prod.quantity,
      comment: prod.comment === undefined ? null : prod.comment,
    };
  });

  const createOrder = await prisma.orders.create({
    data: {
      client,
      products_id: idList,
      product_orders: {
        createMany: {
          data: productOrderData,
        },
      },
    },
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

  const additionals = products.map(prod => {
    if (prod.additionals) {
      return {
        additionals: prod.additionals,
        product_id: prod.products_id,
      };
    }
  });

  const productOrder = createOrder.product_orders;

  const merged = [];

  for (let i = 0; i < additionals.length; i++) {
    merged.push({
      additional_id: additionals[i]?.additionals,
      product_order_id: productOrder.find(
        itmInner => itmInner.product.id === additionals[i]?.product_id,
      )?.id,
    });
  }

  const addOnOrderData = merged.map(item =>
    item.additional_id?.map(add => {
      return {
        additional_id: add,
        product_order_id: item.product_order_id || '',
      };
    }),
  );

  addOnOrderData.map(addData =>
    addData?.map(async dataToAdd => {
      if (dataToAdd.product_order_id) {
        await prisma.additional_on_order.create({
          data: dataToAdd,
          include: {
            product_order: true,
          },
        });
      }
    }),
  );

  const order = await prisma.orders.findUniqueOrThrow({
    where: { id: createOrder.id },
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
    .map(od => od.additionals.map(add => add.additional))
    .map(item => item.map(i => i.price))
    .reduce((elem1, elem2) => elem1.concat(elem2))
    .reduce((acc: number, curr) => acc + curr, 0);

  const priceTotal =
    order.product_orders.reduce(
      (acc: number, curr) => acc + curr.quantity * curr.product.price,
      0,
    ) + additionalsTotal;

  const returnObj = { ...order, priceTotal };

  return orderReturnSchema.parse(returnObj);
};

export const listAllOrdersService = async () => {
  const list = await prisma.orders.findMany({
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      code: true,
      status: true,
      product_orders: prodSelect,
    },
    orderBy: {
      code: 'asc',
    },
  });

  const pricedList = list.map(order => {
    const additionalsTotal = order.product_orders
      .map(od => od.additionals.map(add => add.additional))
      .map(item => item.map(i => i.price))
      .reduce((elem1, elem2) => elem1.concat(elem2))
      .reduce((acc: number, curr) => acc + curr, 0);

    const priceTotal =
      order.product_orders.reduce(
        (acc: number, curr) => acc + curr.quantity * curr.product.price,
        0,
      ) + additionalsTotal;

    return { ...order, priceTotal };
  });

  const parsedList = orderReturnListSchema.parse(pricedList);

  return parsedList;
};

export const listAOrderService = async (id: string) => {
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
    .map(od => od.additionals.map(add => add.additional))
    .map(item => item.map(i => i.price))
    .reduce((elem1, elem2) => elem1.concat(elem2))
    .reduce((acc: number, curr) => acc + curr, 0);

  const priceTotal =
    order.product_orders.reduce(
      (acc: number, curr) => acc + curr.quantity * curr.product.price,
      0,
    ) + additionalsTotal;

  const returnObj = { ...order, priceTotal };

  return orderReturnSchema.parse(returnObj);
};

export const updateOrderService = async (
  requestData: OrderUpdateRequestType,
  id: string,
) => {
  const { status, client } = requestData;
  const clientOrder = await (await listAOrderService(id)).client;
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
    .map(od => od.additionals.map(add => add.additional))
    .map(item => item.map(i => i.price))
    .reduce((elem1, elem2) => elem1.concat(elem2))
    .reduce((acc: number, curr) => acc + curr, 0);

  const priceTotal =
    updatedOrder.product_orders.reduce(
      (acc: number, curr) => acc + curr.quantity * curr.product.price,
      0,
    ) + additionalsTotal;

  const returnObj = { ...updatedOrder, priceTotal };

  return orderReturnSchema.parse(returnObj);
};

export const listAllCheckoutService = async () => {
  const list = await prisma.orders.findMany({
    where: {
      NOT: [
        {
          OR: [
            {
              status: 'ordering',
            },
            {
              status: 'finished',
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      client: true,
      created_at: true,
      updated_at: true,
      code: true,
      status: true,
      product_orders: prodSelect,
    },
    orderBy: {
      code: 'asc',
    },
  });

  const pricedList = list.map(order => {
    const additionalsTotal = order.product_orders
      .map(od => od.additionals.map(add => add.additional))
      .map(item => item.map(i => i.price))
      .reduce((elem1, elem2) => elem1.concat(elem2))
      .reduce((acc: number, curr) => acc + curr, 0);

    const priceTotal =
      order.product_orders.reduce(
        (acc: number, curr) => acc + curr.quantity * curr.product.price,
        0,
      ) + additionalsTotal;

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
      code: true,
      status: true,
      product_orders: prodSelect,
    },
    orderBy: {
      code: 'asc',
    },
  });

  const pricedList = list.map(order => {
    const additionalsTotal = order.product_orders
      .map(od => od.additionals.map(add => add.additional))
      .map(item => item.map(i => i.price))
      .reduce((elem1, elem2) => elem1.concat(elem2))
      .reduce((acc: number, curr) => acc + curr, 0);

    const priceTotal =
      order.product_orders.reduce(
        (acc: number, curr) => acc + curr.quantity * curr.product.price,
        0,
      ) + additionalsTotal;

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
      code: true,
      status: true,
      product_orders: prodSelect,
      reason_of_refusal: true,
    },
    orderBy: {
      code: 'asc',
    },
  });

  const pricedList = list.map(order => {
    const additionalsTotal = order.product_orders
      .map(od => od.additionals.map(add => add.additional))
      .map(item => item.map(i => i.price))
      .reduce((elem1, elem2) => elem1.concat(elem2))
      .reduce((acc: number, curr) => acc + curr, 0);

    const priceTotal =
      order.product_orders.reduce(
        (acc: number, curr) => acc + curr.quantity * curr.product.price,
        0,
      ) + additionalsTotal;

    return { ...order, priceTotal };
  });

  const listReturn = {
    count: list.length,
    data: orderReturnListSchema.parse(pricedList),
  };

  return listReturn;
};
