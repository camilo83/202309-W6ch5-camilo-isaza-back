import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { elementsRouter } from './router/elements.router.js';
import createDebug from 'debug';
import { errorMiddleware } from './middleware/error.middleware.js';
import { scientistsRouter } from './router/scientists.router.js';
import { experimentsRouter } from './router/experiments.router.js';
import { usersRouter } from './router/users.router.js';

const debug = createDebug('W7E:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/scientists', scientistsRouter);
app.use('/elements', elementsRouter);
app.use('/experiments', experimentsRouter);
app.use('/users', usersRouter);

app.use(errorMiddleware);
