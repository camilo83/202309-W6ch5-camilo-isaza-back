import { Request, Response } from 'express';
import fs from 'fs';

const dataFilePath = './api/db.json';
let data: any[] = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  data = JSON.parse(rawData).elements || [];
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
}

const writeDataToFile = () => {
  try {
    const jsonData = JSON.stringify({ elements: data }, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf-8');
  } catch (error) {
    console.error('Error al escribir en el archivo db.json:', error);
  }
};

export const getAll = (_req: Request, res: Response) => {
  res.json(data);
};

export const getById = (req: Request, res: Response) => {
  const result = data.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const search = (_req: Request, _res: Response) => {};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: data.length + 1 };
  data.push(result);
  writeDataToFile();
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = data.find((item) => Number(item.id) === Number(req.params.id));
  result = { ...result, ...req.body };
  data[data.findIndex((item) => item.id === Number(req.params.id))] = result!;
  writeDataToFile();
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  data.splice(
    data.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  writeDataToFile();
  res.json({});
};
