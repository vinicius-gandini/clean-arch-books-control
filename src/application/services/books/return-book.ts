import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { BookStatus } from '@/domain/entities';
import {
  GetBookInfoRepository,
  UpdateBookRepository,
} from '@/domain/repositories/books';

@injectable()
export class ReturnBookService implements UpdateBookRepository {
  constructor(
    @inject(ServiceKeys.UPDATE_BOOK)
    private readonly updateBookRepository: UpdateBookRepository,
    @inject(ServiceKeys.GET_BOOK_INFO)
    private readonly getBookInfoRepository: GetBookInfoRepository,
  ) {}

  async update(
    id: UpdateBookRepository.Params,
  ): Promise<UpdateBookRepository.Result> {
    const book = await this.getBookInfoRepository.getBookInfo(id);

    if (
      [BookStatus.not_available, BookStatus.available].includes(book.status)
    ) {
      throw new Error(
        `Book has already returned or it's not available. Please check the book status`,
      );
    }

    const returnedBook = await this.updateBookRepository.update(id, {
      status: BookStatus.available,
    });

    return returnedBook;
  }
}
