import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { DeleteBookService } from '@/application/services/books/delete-book';
import { DeleteBookRepository } from '@/domain/repositories';

export class DeleteBookController implements Controller {
  async handle({
    params,
  }: Controller.Request<DeleteBookRepository.Params>): Promise<
    HttpResponse<DeleteBookRepository.Result>
  > {
    const deleteBookService = container.resolve(DeleteBookService);

    const book = await deleteBookService.delete({ id: params.id });

    return new HttpResponse(book);
  }
}
