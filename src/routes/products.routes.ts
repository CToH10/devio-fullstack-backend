/* eslint-disable import/extensions */
import { Router } from 'express';
import { listAllProductsController } from '../controllers/products.controller';

export const productsRoutes: Router = Router();

productsRoutes.get('', listAllProductsController);
