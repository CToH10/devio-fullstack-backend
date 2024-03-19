import cors from 'cors';
import express, { Application, Request } from 'express';
import { ErrorHandler } from './errors';

export const app: Application = express();

app.use(express.json());
app.use(cors<Request>());

// routes

app.use(ErrorHandler);
