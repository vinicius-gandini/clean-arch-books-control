import { injectable } from 'tsyringe';

import { Book, EditBook } from '@/domain/entities';
import { UpdateBookRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class UpdateBookRepositoryImpl implements UpdateBookRepository {
  async update(id: string, params: EditBook) {
    const book = await BooksModel.findOneAndUpdate({ id }, params, {
      new: true,
    });
    const parsedBook = book?.toJSON();

    return parsedBook;
  }
}
