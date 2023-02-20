import { injectable } from 'tsyringe';

import { Book } from '@/domain/entities';
import { CreateBookRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class CreateBookRepositoryImpl implements CreateBookRepository {
  async create(params: Book) {
    const book = await BooksModel.create(params);
    const parsedBook = book.toJSON();

    return parsedBook;
  }
}
