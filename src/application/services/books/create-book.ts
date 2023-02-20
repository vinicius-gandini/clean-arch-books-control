import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { ServiceKeys } from '@/common/container/keys';
import { CreateBookRepository } from '@/domain/repositories/books';

@injectable()
export class CreateBookService implements CreateBookRepository {
  constructor(
    @inject(ServiceKeys.CREATE_BOOK)
    private readonly createBookRepository: CreateBookRepository,
  ) {}

  async create(
    body: CreateBookRepository.Body,
  ): Promise<CreateBookRepository.Result> {
    const book = await this.createBookRepository.create({
      ...body,
      id: uuidv4(),
    });

    return book;
  }
}
