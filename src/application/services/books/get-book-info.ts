import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { GetBookInfoRepository } from '@/domain/repositories/books';

@injectable()
export class GetBookInfoService implements GetBookInfoRepository {
  constructor(
    @inject(ServiceKeys.GET_BOOK_INFO)
    private readonly getBookInfoRepository: GetBookInfoRepository,
  ) {}

  async getBookInfo(
    id: GetBookInfoRepository.Params,
  ): Promise<GetBookInfoRepository.Result> {
    const book = await this.getBookInfoRepository.getBookInfo(id);

    return book;
  }
}
