import { Scientist } from '../../entities/scientist';
import { ScientistsModel } from './scientists.model.mongo.js';
import { Repository } from '../repo';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:notes:mongo:repo');

export class ScientistsMongoRepo implements Repository<Scientist> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Scientist[]> {
    const result = await ScientistsModel.find();
    return result;
  }

  async getById(id: string): Promise<Scientist> {
    debug('hola desde repo');
    const result = await ScientistsModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: keyof Scientist;
    value: any;
  }): Promise<Scientist[]> {
    const result = await ScientistsModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }

  async create(newItem: Omit<Scientist, 'id'>): Promise<Scientist> {
    const result: Scientist = await ScientistsModel.create(newItem);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Scientist>
  ): Promise<Scientist> {
    const result = await ScientistsModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await ScientistsModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
