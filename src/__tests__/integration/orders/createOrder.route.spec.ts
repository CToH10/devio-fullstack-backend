import { orders } from '@prisma/client';
import { prismaMock } from '../../../singleton';
import { createOrderRouteMock } from '../../mocks';

// mock function
async function createOrder(data: orders) {
  await console.log(data);

  return data;
}

test('Should create an order', async () => {
  prismaMock.orders.create.mockResolvedValue({
    ...createOrderRouteMock.orderComplete,
  });

  await expect(
    createOrder(createOrderRouteMock.orderComplete),
  ).resolves.toEqual(createOrderRouteMock.orderComplete);
});
