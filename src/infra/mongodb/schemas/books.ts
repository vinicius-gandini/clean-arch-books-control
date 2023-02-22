import { model, Schema } from 'mongoose';

import { BookStatus } from '@/domain/entities/book';

const BookSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [BookStatus.available, BookStatus.not_available, BookStatus.rented],
    required: true,
  },
});

export const BooksModel = model('Books', BookSchema);
