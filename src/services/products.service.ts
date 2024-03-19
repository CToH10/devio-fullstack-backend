import prisma from '../client';

export const listAllProductsService = async () => {
  const list = await prisma.product.findMany();

  return list;
};
