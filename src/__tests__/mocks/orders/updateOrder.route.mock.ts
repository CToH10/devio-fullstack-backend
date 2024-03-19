import { OrderStatusEnum } from '@prisma/client';

export default {
  orderPreparing: {
    status: OrderStatusEnum.preparing,
  },
  orderReady: {
    status: OrderStatusEnum.ready,
  },
  orderFinished: {
    status: OrderStatusEnum.finished,
  },
  orderOrderingInvalid: {
    status: OrderStatusEnum.ordering,
  },
  orderRefused: {
    status: OrderStatusEnum.refused,
  },
};
