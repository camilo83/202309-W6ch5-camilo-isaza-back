import { Router as createRouter } from 'express';
import { ScientistsController } from '../controller/scientists/scientists.controller.js';
import createDebug from 'debug';
import { ScientistsMongoRepo } from '../repos/scientists/scientists.repo.mongo.js';

const debug = createDebug('W7E:scientists:router');

export const scientistsRouter = createRouter();
debug('Starting');

const repo = new ScientistsMongoRepo();
const controller = new ScientistsController(repo);

scientistsRouter.get('/', controller.getAll.bind(controller));
scientistsRouter.get('/:id', controller.getById.bind(controller));
scientistsRouter.get('/search', controller.search.bind(controller));
scientistsRouter.post('/', controller.create.bind(controller));
scientistsRouter.patch('/:id', controller.update.bind(controller));
scientistsRouter.delete('/:id', controller.delete.bind(controller));
