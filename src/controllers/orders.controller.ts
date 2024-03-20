/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import {
  createOrderService,
  listAllOrdersService,
  updateOrderService,
} from '../services/orders.service';

export const listAllOrdersController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const list = await listAllOrdersService();

  return response.json(list);
};

export const createOrderController = async (
  request: Request,
  response: Response,
) => {
  const order = await createOrderService(request.body);

  return response.status(201).json(order);
};

export const updateOrderControler = async (
  request: Request,
  response: Response,
) => {
  const { id } = request.params;

  const updatedOrder = await updateOrderService(request.body, id.trim());

  return response.json(updatedOrder);
};
