import { Request, Response } from 'express';
import { ScientistsController } from './scientists.controller';
import { ScientistsMongoRepo } from '../../repos/scientists/scientists.repo.mongo';

describe('Given TasksController class', () => {
  let controller: ScientistsController;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: jest.Mock;
  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    } as Request;
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });
  describe('When we instantiate it without errors', () => {
    beforeEach(() => {
      const mockRepo = {
        getAll: jest.fn().mockResolvedValue([{}]),
        getById: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue(undefined),
      } as unknown as ScientistsMongoRepo;

      controller = new ScientistsController(mockRepo);
    });

    test('Then getAll should ...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getById should ...', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
    test('Then create should ...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalled();
    });
    test('Then update should ...', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalled();
    });
    test('Then update should ...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it WITH errors', () => {
    let mockError: Error;
    beforeEach(() => {
      mockError = new Error('Mock error');
      const mockRepo = {
        getById: jest.fn().mockRejectedValue(mockError),
      } as unknown as ScientistsMongoRepo;

      controller = new ScientistsController(mockRepo);
    });
    test('Then getById should ...', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });
  });
});
