import { NextFunction, Request, Response } from 'express';

import { Repository } from '../../repos/repo';
import { Experiment } from '../../entities/experiments';
import createDebug from 'debug';

const debug = createDebug('W7E:experiments:controller');

export class ExperimentsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: Repository<Experiment>) {
    debug('Instantiated');
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.search({
        key: Object.entries(req.query)[0][0] as keyof Experiment,
        value: Object.entries(req.query)[0][1],
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.experimentImage = {
        publicId: req.file?.filename,
        format: req.file?.mimetype,
        url: req.file?.path,
        size: req.file?.size,
      };
      req.body.author = { id: req.body.userId }; // ID del autor

      const result = await this.repo.create(req.body); // Body completo exper sin ID

      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
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
