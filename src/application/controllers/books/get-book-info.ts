import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { GetBookInfoService } from '@/application/services/books/get-book-info';
import { GetBookInfoRepository } from '@/domain/repositories';

export class GetBookInfoController implements Controller {
  async handle({
    params,
  }: Controller.Request<GetBookInfoRepository.Params>): Promise<
    HttpResponse<GetBookInfoRepository.Result>
  > {
    const getBookInfoService = container.resolve(GetBookInfoService);

    const book = await getBookInfoService.getBookInfo({ id: params.id });

    return new HttpResponse(book);
  }
}
