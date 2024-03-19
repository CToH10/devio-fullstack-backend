/* eslint-disable import/extensions */
import cors from 'cors';
import express, { Application, Request } from 'express';
import { ErrorHandler } from './errors';
import { productsRoutes } from './routes/products.routes';

export const app: Application = express();

app.use(express.json());
app.use(cors<Request>());

// routes
app.use('/products', productsRoutes);

app.use(ErrorHandler);
