import { Router as createRouter } from 'express';
import { ExperimentsController } from '../controller/experiments/experiments.controller.js';
import createDebug from 'debug';
import { ExperimentsMongoRepo } from '../repos/experiments/experiments.repo.mongo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('W7E:experiments:router');

export const experimentsRouter = createRouter();
debug('Starting');

const repo = new ExperimentsMongoRepo();
const controller = new ExperimentsController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

experimentsRouter.get('/', controller.getAll.bind(controller));
experimentsRouter.get('/search', controller.search.bind(controller));
experimentsRouter.get('/:id', controller.getById.bind(controller));
experimentsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('experimentImage').bind(fileInterceptor),
  controller.create.bind(controller)
);
experimentsRouter.patch('/:id', controller.update.bind(controller));
experimentsRouter.delete('/:id', controller.delete.bind(controller));
