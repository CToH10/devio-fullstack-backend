import { CategoriesEnum, Prisma } from '@prisma/client';
import prisma from '../client';
import { AppError } from '../errors';

export const listAllProductsService = async (
  searchParam: CategoriesEnum | undefined,
) => {
  let query: Prisma.productFindManyArgs;

  if (searchParam) {
    if (searchParam in CategoriesEnum) {
      query = { where: { category: searchParam } };

      const searchParamList = await prisma.$transaction([
        prisma.product.findMany(query),
      ]);

      return searchParamList;
    }

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        searchParam,
      )
    ) {
      query = { where: { id: searchParam } };
    } else {
      query = { where: { name: searchParam } };
    }
    const searchParamObj = await prisma.$transaction([
      prisma.product.findFirst(query),
    ]);

    if (!searchParamObj[0]) {
      throw new AppError('Não foi encontrado o produto especificado', 404);
    }

    return searchParamObj[0];
  }

  const list = await prisma.product.findMany();

  return list;
};
