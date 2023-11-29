import { Router as createRouter } from 'express';
import { ElementsController } from '../controller/elements/elements.controller.js';
import createDebug from 'debug';
import { ElementsFileRepo } from '../repos/elements/elements.file.repo.js';

const debug = createDebug('W7E:elements:router');

export const elementsRouter = createRouter();
debug('Starting');

const repo = new ElementsFileRepo();
const controller = new ElementsController(repo);

elementsRouter.get('/', controller.getAll.bind(controller));
elementsRouter.get('/:id', controller.getById.bind(controller));
elementsRouter.get('/:search', controller.search.bind(controller));
elementsRouter.post('/', controller.create.bind(controller));
elementsRouter.patch('/:id', controller.update.bind(controller));
elementsRouter.delete('/:id', controller.delete.bind(controller));
