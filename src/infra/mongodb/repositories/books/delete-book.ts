import { injectable } from 'tsyringe';

import { DeleteBookRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class DeleteBookRepositoryImpl implements DeleteBookRepository {
  async delete(id: DeleteBookRepository.Params) {
    await BooksModel.deleteOne(id);
  }
}
