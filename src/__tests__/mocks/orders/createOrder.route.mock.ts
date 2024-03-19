import { OrderStatusEnum } from '@prisma/client';
import { randomUUID } from 'crypto';

type OrderStatusMock = 'ordering' | 'preparing' | 'ready' | 'finished';

export default {
  orderComplete: {
    id: randomUUID(),
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: `${randomUUID()}`,
    client: 'Josevaldo',
  },
  orderWithoutClient: {
    id: randomUUID(),
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: `${randomUUID()}`,
  },
  orderWithoutProducts: {
    id: randomUUID(),
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    client: 'Josevaldo',
  },
  orderInvalidProducts: {
    id: randomUUID(),
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: `randomUUID`,
    client: 'Josevaldo',
  },
  orderInvalidClient: {
    id: randomUUID(),
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: `${randomUUID()}`,
    client: 123456,
  },
};
