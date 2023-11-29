import { Element } from '../../entities/element';
import { HttpError } from '../../types/http.error';
import { ElementsFileRepo } from './elements.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    const mockItem = { name: 'Test2' } as Element;

    fs.readFile = jest.fn().mockResolvedValue(mockData);

    const repo = new ElementsFileRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
      const result2 = await repo.getById('1');
      expect(result2).toEqual({ id: '1', name: 'Test' });
      await expect(repo.getById('2')).rejects.toThrowError(
        new HttpError(404, 'Not Found', 'GetById not possible')
      );
      const result3 = await repo.create(mockItem);
      expect(result3).toEqual({
        ...mockItem,
        id: expect.any(String),
      });
      const result4 = await repo.update('1', mockItem);
      expect(result4).toEqual({ ...mockItem, id: '1' });
      const result5 = await repo.delete('1');
      expect(result5).toEqual(undefined);
    });
  });
});
