import { OrderStatusEnum } from '@prisma/client';
import { randomUUID } from 'crypto';

type OrderStatusMock = 'ordering' | 'preparing' | 'ready' | 'finished';

export default {
  orderComplete: {
    id: randomUUID(),
    reason_of_refusal: null,
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: [`${randomUUID()}`],
    client: 'Josevaldo',
    code: 1,
  },
  orderWithoutClient: {
    id: randomUUID(),
    reason_of_refusal: null,
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: [`${randomUUID()}`],
    code: 1,
  },
  orderWithoutProducts: {
    id: randomUUID(),
    reason_of_refusal: null,
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    client: 'Josevaldo',
    code: 1,
  },
  orderInvalidProducts: {
    id: randomUUID(),
    reason_of_refusal: null,
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: `randomUUID`,
    client: 'Josevaldo',
  },
  orderInvalidClient: {
    id: randomUUID(),
    reason_of_refusal: null,
    status: OrderStatusEnum as unknown as OrderStatusMock,
    created_at: new Date(),
    updated_at: new Date(),
    products_id: [`${randomUUID()}`],
    client: 123456,
    code: 1,
  },
};
