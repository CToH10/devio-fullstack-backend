import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const protectData =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const validatedData = schema.parse(request.body);

    request.body = validatedData;

    return next();
  };
