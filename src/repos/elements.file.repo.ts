import fs from 'fs/promises';
import { Element } from '../entities/element';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:elements:file:repo');

export class ElementsFileRepo implements Repository<Element> {
  file: string;
  elements: Element[];
  constructor() {
    debug('Instantiated');
    this.file = './data/data.json';
    this.elements = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.elements = JSON.parse(data);
  }

  async getAll(): Promise<Element[]> {
    return this.elements;
  }

  async getById(id: string): Promise<Element> {
    const result = this.elements.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Element, 'id'>): Promise<Element> {
    const result: Element = { ...newItem, id: crypto.randomUUID() };
    const newTasks = [...this.elements, result];
    await this.save(newTasks as Element[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Element>): Promise<Element> {
    let result = this.elements.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Element;
    const newTasks = this.elements.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newTasks as Element[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.elements.filter((item) => item.id !== id);
    if (newTasks.length === this.elements.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newTasks: Element[]) {
    await fs.writeFile(this.file, JSON.stringify(newTasks), {
      encoding: 'utf-8',
    });
    this.elements = newTasks;
  }
}
