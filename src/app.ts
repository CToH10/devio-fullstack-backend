import cors from 'cors';
import express, { Application, Request } from 'express';

export const app: Application = express();

app.use(express.json());
app.use(cors<Request>());
