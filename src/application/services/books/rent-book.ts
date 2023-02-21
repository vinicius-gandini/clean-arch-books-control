import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { BookStatus } from '@/domain/entities';
import { FindUsersRepository } from '@/domain/repositories';
import {
  GetBookInfoRepository,
  RentBookRepository,
} from '@/domain/repositories/books';

@injectable()
export class RentBookService implements RentBookRepository {
  constructor(
    @inject(ServiceKeys.RENT_BOOK)
    private readonly rentBookRepository: RentBookRepository,
    @inject(ServiceKeys.GET_BOOK_INFO)
    private readonly getBookInfoRepository: GetBookInfoRepository,
    @inject(ServiceKeys.FIND_USER)
    private readonly findUserRepository: FindUsersRepository,
  ) {}

  async rent(
    body: RentBookRepository.Body,
  ): Promise<RentBookRepository.Result> {
    const { bookId, userId } = body;

    const book = await this.getBookInfoRepository.getBookInfo({ id: bookId });

    if (!book) {
      throw new Error(`Book not found`);
    }

    if (book.status !== BookStatus.available) {
      throw new Error(`Book not available for rent`);
    }

    const user = await this.findUserRepository.findById({ id: userId });

    if (!user) {
      throw new Error(`User not found`);
    }

    const rentedBook = await this.rentBookRepository.rent(body);

    return rentedBook;
  }
}
