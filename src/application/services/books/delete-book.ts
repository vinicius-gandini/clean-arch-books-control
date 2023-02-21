import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { BookStatus } from '@/domain/entities';
import {
  DeleteBookRepository,
  GetBookInfoRepository,
} from '@/domain/repositories/books';

@injectable()
export class DeleteBookService implements DeleteBookRepository {
  constructor(
    @inject(ServiceKeys.DELETE_BOOK)
    private readonly deleteBookRepository: DeleteBookRepository,
    @inject(ServiceKeys.GET_BOOK_INFO)
    private readonly getBookInfoRepository: GetBookInfoRepository,
  ) {}

  async delete(
    id: DeleteBookRepository.Params,
  ): Promise<DeleteBookRepository.Result> {
    const book = await this.getBookInfoRepository.getBookInfo(id);

    if (book?.status !== BookStatus.available) {
      throw new Error(
        `Book not available to delete. Please verify if the book have the available status`,
      );
    }

    const deletedBook = await this.deleteBookRepository.delete(id);

    return deletedBook;
  }
}
