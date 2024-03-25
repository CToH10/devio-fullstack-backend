/* eslint-disable import/extensions */
import { NextFunction, Request, Response } from 'express';
import prisma from '../client';
import { AppError } from '../errors';
import { OrderRequestType } from '../interfaces/orders.interfaces';

export const ensureProductExists = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { body }: { body: OrderRequestType } = request;

  const idArray = body.products.map(prod => prod.products_id);
  const doesExist = await prisma.product.findMany({
    where: {
      id: { in: idArray },
    },
  });

  if (doesExist.length === 0) {
    throw new AppError(`Product not found`, 404);
  }

  return next();
};
