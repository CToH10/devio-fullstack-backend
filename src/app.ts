/* eslint-disable import/extensions */
import cors from 'cors';
import express, { Application, Request } from 'express';
import 'express-async-errors';
import { ErrorHandler } from './errors';
import { additionalRoutes } from './routes/additionals.routes';
import { orderRoutes } from './routes/orders.routes';
import { productsRoutes } from './routes/products.routes';

export const app: Application = express();

app.use(express.json());
app.use(cors<Request>());

app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);
app.use('/add', additionalRoutes);

app.use(ErrorHandler);
