/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { listAllProductsService } from '../services/products.service';

export const listAllProductsController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const list = await listAllProductsService();

  return response.json(list);
};
