import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { elementsRouter } from './router/elements.router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use((_req: Request, res: Response, next: NextFunction) => {
  console.log('Hola Mundo desde Express');
  next();
});

app.use('/elements', elementsRouter);
