import fs from 'fs/promises';
import { Element } from '../../entities/element';
import { Repository } from '../repo';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:elements:file:repo');

export class ElementsFileRepo implements Repository<Element> {
  file: string;
  elementss: { elements: Element[] };
  constructor() {
    debug('Instantiated');
    this.file = './data/data.json';
    this.elementss = { elements: [] };
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.elementss = JSON.parse(data);
  }

  async getAll(): Promise<Element[]> {
    const myElements = this.elementss.elements;
    debug(myElements);
    return myElements;
  }

  async getById(id: string): Promise<Element> {
    const result = this.elementss.elements.find(
      (item: Element) => item.id === id
    );

    if (!result) {
      throw new HttpError(404, 'Not Found', 'GetById not possible');
    }

    return result;
  }

  // eslint-disable-next-line no-unused-vars
  search({ key, value }: { key: string; value: unknown }): Promise<Element[]> {
    // Temp this.tasks.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Element, 'id'>): Promise<Element> {
    const result: Element = { ...newItem, id: crypto.randomUUID() };
    const newTasks = [...this.elementss.elements, result];
    await this.save(newTasks as Element[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Element>): Promise<Element> {
    let result = this.elementss.elements.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Element;
    const newTasks = this.elementss.elements.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newTasks as Element[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.elementss.elements.filter((item) => item.id !== id);
    if (newTasks.length === this.elementss.elements.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newTasks: Element[]) {
    await fs.writeFile(this.file, JSON.stringify(newTasks), {
      encoding: 'utf-8',
    });
    this.elementss.elements = newTasks;
  }
}
