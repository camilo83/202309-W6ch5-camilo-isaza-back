import { Scientist } from '../../entities/scientist';
import { ScientistsModel } from './scientists.model.mongo';
import { ScientistsMongoRepo } from './scientists.repo.mongo';

jest.mock('./scientists.model.mongo', () => ({
  ScientistsModel: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Given ScientistsMongoRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    const mockItem = { name: 'Test2' } as unknown as Scientist;

    beforeEach(() => {
      (ScientistsModel.find as jest.Mock).mockResolvedValue(mockData);
      (ScientistsModel.findById as jest.Mock).mockResolvedValue(mockData);
      (ScientistsModel.create as jest.Mock).mockResolvedValue(mockItem);
      (ScientistsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        mockItem
      );
      (ScientistsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockItem
      );
    });

    const repo = new ScientistsMongoRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(mockData);
    });
    test('Then getAll should ...', async () => {
      const result = await repo.getById('1');
      expect(result).toStrictEqual(mockData);
    });
    test('Then create should return the created scientist with an id', async () => {
      const result = await repo.create(mockItem);
      expect(result).toEqual({ ...mockItem });
    });
    test('Then create should return the created scientist with an id', async () => {
      const result = await repo.update('1', mockItem);
      expect(result).toEqual({ ...mockItem });
    });
    test('Then create should return the created scientist with an id', async () => {
      const result = await repo.delete('1');
      expect(result).toEqual(undefined);
    });
  });
});
