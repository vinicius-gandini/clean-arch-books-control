import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { ReturnBookService } from '@/application/services';
import { UpdateBookRepository } from '@/domain/repositories';

export class ReturnBookController implements Controller {
  async handle({
    params,
  }: Controller.Request<UpdateBookRepository.Params>): Promise<
    HttpResponse<UpdateBookRepository.Result>
  > {
    const returnBookService = container.resolve(ReturnBookService);

    const book = await returnBookService.update({ id: params.id });

    return new HttpResponse(book);
  }
}
