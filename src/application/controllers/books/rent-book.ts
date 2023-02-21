import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { RentBookService } from '@/application/services/books/rent-book';
import {
  RentBookRepository,
  UpdateBookRepository,
} from '@/domain/repositories';

export class RentBookController implements Controller {
  async handle({
    body,
  }: Controller.Request<RentBookRepository.Body>): Promise<
    HttpResponse<UpdateBookRepository.Result>
  > {
    const rentBookService = container.resolve(RentBookService);

    const book = await rentBookService.rent(body);

    return new HttpResponse(book);
  }
}
