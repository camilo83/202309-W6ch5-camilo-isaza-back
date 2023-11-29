import { Experiment } from '../../entities/experiments';
import { ExperimentsModel } from './experiments.model.mongo.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../users/users.mongo.repo.js';

const debug = createDebug('W7E:notes:mongo:repo');

export class ExperimentsMongoRepo implements Repository<Experiment> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Experiment[]> {
    const result = await ExperimentsModel.find()
      .populate('author', {
        experiments: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Experiment> {
    const result = await ExperimentsModel.findById(id)
      .populate('author', {
        experiments: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: keyof Experiment;
    value: any;
  }): Promise<Experiment[]> {
    const result = await ExperimentsModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }

  async create(newItem: Omit<Experiment, 'id'>): Promise<Experiment> {
    debug('newItem', newItem);
    const userID = newItem.author.id;

    const user = await this.userRepo.getById(userID);
    const result: Experiment = await ExperimentsModel.create({
      ...newItem,
      author: userID,
    });
    debug('result1', result);
    user.experiments.push(result);
    await this.userRepo.update(userID, user);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Experiment>
  ): Promise<Experiment> {
    const result = await ExperimentsModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', {
        experiments: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await ExperimentsModel.findByIdAndDelete(id)
      .populate('author', {
        experiments: 0,
      })
      .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
