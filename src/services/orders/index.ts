/* eslint-disable import/extensions */
import { deleteAnOrderService } from '../orders/deleteAnOrder.service';
import { createOrderService } from './createOrder.service';
import { listAllCheckoutService } from './listAllCheckout.service';
import { listAllFinishedService } from './listAllFinished.service';
import { listAllOrdersService } from './listAllOrders.service';
import { listAllRefusedService } from './listAllRefused.service';
import { listAnOrderService } from './listAnOrder.service';
import { updateOrderService } from './updateOrder.service';

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

export {
  createOrderService,
  deleteAnOrderService,
  listAllCheckoutService,
  listAllFinishedService,
  listAllOrdersService,
  listAllRefusedService,
  listAnOrderService,
  prodSelect,
  updateOrderService,
};
