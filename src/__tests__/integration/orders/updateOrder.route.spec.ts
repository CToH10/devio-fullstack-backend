import { prismaMock } from '../../../singleton';
import { createOrderRouteMock, updateOrderRouteMock } from '../../mocks';

// mock function
async function updateOrder(data: { status: string }, id: string) {
  await console.log(data, id);

  return { ...createOrderRouteMock.orderComplete, ...data, id };
}

test('Should update an order status', async () => {
  prismaMock.orders.create.mockResolvedValue({
    ...createOrderRouteMock.orderComplete,
  });

  await expect(
    updateOrder(
      updateOrderRouteMock.orderPreparing,
      createOrderRouteMock.orderComplete.id,
    ),
  ).resolves.toEqual({
    ...createOrderRouteMock.orderComplete,
    ...updateOrderRouteMock.orderPreparing,
  });
});
