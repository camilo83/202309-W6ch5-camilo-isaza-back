import { Router as createRouter } from 'express';
import { ElementsController } from '../controller/elements.controller.js';
import createDebug from 'debug';

const debug = createDebug('W7E:elements:router');

export const elementsRouter = createRouter();
debug('Starting');

const controller = new ElementsController();

elementsRouter.get('/', controller.getAll.bind(controller));
elementsRouter.get('/:id', controller.getById.bind(controller));
elementsRouter.post('/', controller.create.bind(controller));
elementsRouter.patch('/:id', controller.update.bind(controller));
elementsRouter.delete('/:id', controller.delete.bind(controller));
