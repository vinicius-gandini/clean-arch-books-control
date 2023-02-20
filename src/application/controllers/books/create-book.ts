import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { CreateBookService } from '@/application/services';
import { CreateBookRepository } from '@/domain/repositories';

export class CreateBookController implements Controller {
  async handle({
    body,
  }: Controller.Request<CreateBookRepository.Body>): Promise<
    HttpResponse<CreateBookRepository.Result>
  > {
    const createBookService = container.resolve(CreateBookService);

    const book = await createBookService.create(body);

    return new HttpResponse(book);
  }
}
