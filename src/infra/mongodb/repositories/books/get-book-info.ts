import { injectable } from 'tsyringe';

import { GetBookInfoRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class GetBookInfoRepositoryImpl implements GetBookInfoRepository {
  async getBookInfo(id: GetBookInfoRepository.Params) {
    const projection = {
      _id: false,
      __v: false
    }

    const book = await BooksModel.findOne(id, projection);

    return book;
  }
}
