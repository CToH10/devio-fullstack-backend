import prisma from '../client';

export const listAllAdditionalsService = async () => {
  const additionals = await prisma.additional.findMany();

  return additionals;
};
