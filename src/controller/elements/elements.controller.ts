import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Element } from '../../entities/element.js';
import { Repository } from '../../repos/repo.js';

const debug = createDebug('W7E:elements:controller');

export class ElementsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: Repository<Element>) {
    debug('Instantiated');
  }

  async getAll(req: Request, res: Response) {
    const result = await this.repo.getAll();
    debug(result);
    res.json(result);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      debug('hola desde controller');
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  search = (_req: Request, _res: Response) => {};

  async create(req: Request, res: Response) {
    const result = await this.repo.create(req.body);
    res.status(201);
    res.statusMessage = 'Created';
    res.json(result);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      next(error);
    }
  }
}
