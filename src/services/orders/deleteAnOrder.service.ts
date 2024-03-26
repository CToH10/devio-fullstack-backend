import prisma from '../../client';
import { AppError } from '../../errors';

export const deleteAnOrderService = async (id: string) => {
  const toDelete = await prisma.orders.findFirst({
    where: {
      id,
    },
  });

  if (!toDelete) {
    throw new AppError('Order not found', 404);
  }

  await prisma.orders.delete({
    where: {
      id,
    },
  });
};
