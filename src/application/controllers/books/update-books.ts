import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { UpdateBookService } from '@/application/services';
import { UpdateBookRepository } from '@/domain/repositories';

export class UpdateBookController implements Controller {
  async handle({
    params,
    body,
  }: Controller.Request<
    UpdateBookRepository.Params,
    UpdateBookRepository.Body
  >): Promise<HttpResponse<UpdateBookRepository.Result>> {
    const updateBookService = container.resolve(UpdateBookService);

    const book = await updateBookService.update(params.id, body);

    return new HttpResponse(book);
  }
}
