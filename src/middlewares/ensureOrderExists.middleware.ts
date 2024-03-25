import { NextFunction, Request, Response } from 'express';
import prisma from '../client';
import { AppError } from '../errors';

export const ensureOrderExists = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params;

  const doesExist = await prisma.orders.findUnique({
    where: {
      id,
    },
  });

  if (!doesExist) {
    throw new AppError(`Order not found`, 404);
  }

  return next();
};
