import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { GetBooksRepository } from '@/domain/repositories/books';

@injectable()
export class GetBooksService implements GetBooksRepository {
  constructor(
    @inject(ServiceKeys.GET_BOOK)
    private readonly getBooksRepository: GetBooksRepository,
  ) {}

  async getBooks(query: GetBooksRepository.Query): Promise<GetBooksRepository.Result> {
    const books = await this.getBooksRepository.getBooks(query);

    return books;
  }
}
