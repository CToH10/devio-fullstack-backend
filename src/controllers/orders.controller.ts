/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import {
  createOrderService,
  deleteAnOrderService,
  listAllCheckoutService,
  listAllFinishedService,
  listAllOrdersService,
  listAllRefusedService,
  listAnOrderService,
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

export const listAllCheckoutController = async (
  request: Request,
  response: Response,
) => {
  const listCheckout = await listAllCheckoutService();

  return response.json(listCheckout);
};

export const listAllFinishedController = async (
  request: Request,
  response: Response,
) => {
  const listFinished = await listAllFinishedService();

  return response.json(listFinished);
};

export const listAllRefusedController = async (
  request: Request,
  response: Response,
) => {
  const listRefused = await listAllRefusedService();

  return response.json(listRefused);
};

export const listAnOrderController = async (
  request: Request,
  response: Response,
) => {
  const { id } = request.params;

  const order = await listAnOrderService(id.trim());

  return response.json(order);
};

export const deleteAnOrderController = async (
  request: Request,
  response: Response,
) => {
  const { id } = request.params;

  await deleteAnOrderService(id);

  return response.status(204).json();
};
