import { prodSelect, listAnOrderService } from ".";
import prisma from "../../client";
import { OrderRequestType } from "../../interfaces/orders.interfaces";
import { orderReturnSchema } from "../../schemas/orders.schema";

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

  const order = await listAnOrderService(createOrder.id);

  return orderReturnSchema.parse(order);
};
