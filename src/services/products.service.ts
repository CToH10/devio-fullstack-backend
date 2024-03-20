import { CategoriesEnum, Prisma } from '@prisma/client';
import prisma from '../client';
import { AppError } from '../errors';
import { pagination } from '../utils/pagination';

export const listAllProductsService = async (
  searchParam: CategoriesEnum | undefined | string,
  perPage: number | undefined = 12,
  page: number | undefined = 1,
) => {
  let perPageQuery: number = perPage;
  let pageQuery: number = page;

  if (perPage === 0) {
    perPageQuery = 1;
  }

  if (Number.isNaN(perPage)) {
    perPageQuery = 12;
  }

  if (Number.isNaN(page)) {
    pageQuery = 1;
  }

  if (Number(page) <= 0) {
    pageQuery = 1;
  }

  let query: Prisma.productFindManyArgs = {
    take: +perPageQuery,
    skip: (+pageQuery - 1) * +perPageQuery,
  };

  if (searchParam) {
    if (searchParam in CategoriesEnum) {
      const category =
        (CategoriesEnum.drink === searchParam && CategoriesEnum.drink) ||
        (CategoriesEnum.side === searchParam && CategoriesEnum.side) ||
        (CategoriesEnum.dessert === searchParam && CategoriesEnum.dessert) ||
        (CategoriesEnum.combo === searchParam && CategoriesEnum.combo);

      query = category
        ? { where: { category }, ...query }
        : { where: {}, ...query };

      const [searchParamList, count] = await prisma.$transaction([
        prisma.product.findMany(query),
        prisma.product.count({ where: query.where || {} }),
      ]);

      return {
        data: searchParamList,
        count,
        ...pagination(count, perPageQuery, pageQuery),
      };
    }

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        searchParam,
      )
    ) {
      query = { where: { id: searchParam }, ...query };
      const searchParamObj = await prisma.$transaction([
        prisma.product.findFirst(query),
      ]);

      if (!searchParamObj[0]) {
        throw new AppError('Não foi encontrado o produto especificado', 404);
      }

      return searchParamObj[0];
    }
    query = {
      where: { name: { contains: searchParam, mode: 'insensitive' } },
      ...query,
    };

    const [searchParamObj, count] = await prisma.$transaction([
      prisma.product.findMany(query),
      prisma.product.count({ where: query.where || {} }),
    ]);

    if (!searchParamObj[0]) {
      throw new AppError('Não foi encontrado o produto especificado', 404);
    }

    return {
      data: searchParamObj,
      count,
      ...pagination(count, perPageQuery, pageQuery),
    };
  }

  const [list, count] = await prisma.$transaction([
    prisma.product.findMany(query),
    prisma.product.count({ where: query.where || {} }),
  ]);

  return {
    data: list,
    count,
    ...pagination(count, perPage, page),
  };
};
