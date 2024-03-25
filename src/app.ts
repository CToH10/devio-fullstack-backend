/* eslint-disable import/extensions */
import cors from 'cors';
import express, { Application, Request } from 'express';
import 'express-async-errors';
import { ErrorHandler } from './errors';
import { additionalRoutes } from './routes/additionals.routes';
import { orderRoutes } from './routes/orders.routes';
import { productsRoutes } from './routes/products.routes';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

export const app: Application = express();

app.use(express.json());
app.use(cors<Request>());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);
app.use('/add', additionalRoutes);

app.use(ErrorHandler);
