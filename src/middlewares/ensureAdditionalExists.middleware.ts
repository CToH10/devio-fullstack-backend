/* eslint-disable import/extensions */
import { NextFunction, Request, Response } from 'express';
import prisma from '../client';
import { AppError } from '../errors';
import { OrderRequestType } from '../interfaces/orders.interfaces';

export const ensureAdditionalExists = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { body }: { body: OrderRequestType } = request;

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  const idArray = body.products
    .filter(
      prodBod =>
        prodBod.additionals !== null && prodBod.additionals !== undefined,
    )
    .map(prod => prod.additionals)
    .flat()
    .filter(notEmpty);

  const uniqueArray = idArray.filter(
    (val, index) => idArray.indexOf(val) === index,
  );

  const doesExist = await prisma.additional.findMany({
    where: {
      id: {
        in: uniqueArray,
      },
    },
  });

  if (doesExist.length !== uniqueArray.length) {
    throw new AppError(`One of the additional items was not found`, 404);
  }

  return next();
};
