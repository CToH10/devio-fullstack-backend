/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import {
  listAProductService,
  listAllProductsService,
} from '../services/products.service';

export const listAllProductsController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { search } = request.params;
  const list = await listAllProductsService(search);

  return response.json(list);
};

export const listAProductController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { search } = request.params;
  const list = await listAProductService(search);

  return response.json(list);
};
