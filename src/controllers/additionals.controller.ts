/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { listAllAdditionalsService } from '../services/additionals.service';

export const listAllAdditionalsController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const addList = await listAllAdditionalsService();

  return response.json(addList);
};
