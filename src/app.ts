import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { elementsRouter } from './router/elements.router.js';
import createDebug from 'debug';
import { errorMiddleware } from './middleware/error.middleware.js';

const debug = createDebug('W7E:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/elements', elementsRouter);

app.use(errorMiddleware);
