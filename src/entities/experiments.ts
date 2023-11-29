import { ImgData } from '../types/imgData';
import { User } from './user';

export type Experiment = {
  id: string;
  name: string;
  author: User;
  year: number;
  materials: string[];
  description: string;
  experimentImage: ImgData;
};
