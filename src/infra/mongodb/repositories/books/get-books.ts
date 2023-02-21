import { injectable } from 'tsyringe';

import { GetBooksRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class GetBooksRepositoryImpl implements GetBooksRepository {
  async getBooks() {
    const books = await BooksModel.find({}, { name: true, id: true, _id: false });

    return books;
  }
}
