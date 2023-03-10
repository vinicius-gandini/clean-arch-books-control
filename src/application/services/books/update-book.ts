import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { BookStatus } from '@/domain/entities';
import {
  GetBookInfoRepository,
  UpdateBookRepository,
} from '@/domain/repositories/books';

@injectable()
export class UpdateBookService implements UpdateBookRepository {
  constructor(
    @inject(ServiceKeys.UPDATE_BOOK)
    private readonly updateBookRepository: UpdateBookRepository,
    @inject(ServiceKeys.GET_BOOK_INFO)
    private readonly getBookInfoRepository: GetBookInfoRepository,
  ) {}

  async update(
    id: UpdateBookRepository.Params,
    body: UpdateBookRepository.Body,
  ): Promise<UpdateBookRepository.Result> {
    const book = await this.getBookInfoRepository.getBookInfo(id);

    if (book.status !== BookStatus.available) {
      throw new Error(
        `Book not available for update. Please check the book status`,
      );
    }
    const updatedBook = await this.updateBookRepository.update(id, body);

    return updatedBook;
  }
}
