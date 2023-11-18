import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  search,
  update,
} from '../controller/elements.controller.js';

export const elementsRouter = createRouter();

elementsRouter.get('/', getAll);
elementsRouter.get('/search', search);
elementsRouter.get('/:id', getById);
elementsRouter.post('/', create);
elementsRouter.patch('/:id', update);
elementsRouter.delete('/:id', remove);
