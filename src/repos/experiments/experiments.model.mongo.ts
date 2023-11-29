import { Schema, model } from 'mongoose';
import { Experiment } from '../../entities/experiments';

const experimentSchema = new Schema<Experiment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  materials: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experimentImage: {
    publicId: String,
    size: Number,
    width: Number,
    height: Number,
    format: String,
    url: String,
  },
});

experimentSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const ExperimentsModel = model(
  'Experiment',
  experimentSchema,
  'experiments'
);
