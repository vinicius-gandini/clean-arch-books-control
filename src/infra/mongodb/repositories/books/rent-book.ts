import { injectable } from 'tsyringe';

import { Book, BookStatus, EditBook } from '@/domain/entities';
import { RentBookRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

import { RentedBooksModel } from '../../schemas/rented-books';

@injectable()
export class RentBookRepositoryImpl implements RentBookRepository {
  async rent(params: RentBookRepository.Body) {
    const rentedBook = await BooksModel.findOneAndUpdate(
      { id: params.bookId },
      { status: BookStatus.rented },
      {
        new: true,
      },
    );

    if (rentedBook) {
      await RentedBooksModel.create(params);
    }

    const parsedBook = rentedBook?.toJSON();

    return parsedBook;
  }
}
