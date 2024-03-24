/* eslint-disable import/extensions */
import { Router } from 'express';
import { listAllAdditionalsController } from '../controllers/additionals.controller';

export const additionalRoutes: Router = Router();

additionalRoutes.get('', listAllAdditionalsController);
