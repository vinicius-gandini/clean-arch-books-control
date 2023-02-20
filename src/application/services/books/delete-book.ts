import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { DeleteBookRepository } from '@/domain/repositories/books';

@injectable()
export class DeleteBookService implements DeleteBookRepository {
  constructor(
    @inject(ServiceKeys.DELETE_BOOK)
    private readonly deleteBookRepository: DeleteBookRepository,
  ) {}

  async delete(
    id: DeleteBookRepository.Params,
  ): Promise<DeleteBookRepository.Result> {
    const book = await this.deleteBookRepository.delete(id);

    return book;
  }
}
