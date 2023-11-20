import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
const debug = createDebug('W7E:error:middleware');

debug('Starting');

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Middleware Errors');

  if (error instanceof HttpError) {
    res.status(error.status);
    res.statusMessage = error.statusMessage;
    res.json({});
    debug(error.message);
  } else {
    // Manejo para otros tipos de errores
    res.status(500).json({ error: 'Internal Server Error' });
    debug(error.message);
  }
};
