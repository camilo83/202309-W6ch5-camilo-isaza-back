import { Schema, model } from 'mongoose';
import { Scientist } from '../../entities/scientist';

const scientistsSchema = new Schema<Scientist>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  discoveries: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  specialityArea: {
    type: String,
    required: true,
  },
  nobels: {
    type: Number,
    required: true,
  },
  isAlive: {
    type: Boolean,
    required: true,
    default: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

scientistsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const ScientistsModel = model(
  'Scientists',
  scientistsSchema,
  'scientists'
);
