import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { UpdateBookRepository } from '@/domain/repositories/books';

@injectable()
export class UpdateBookService implements UpdateBookRepository {
  constructor(
    @inject(ServiceKeys.UPDATE_BOOK)
    private readonly updateBookRepository: UpdateBookRepository,
  ) {}

  async update(
    id: string,
    body: UpdateBookRepository.Body,
  ): Promise<UpdateBookRepository.Result> {
    const book = await this.updateBookRepository.update(id, body);

    return book;
  }
}
