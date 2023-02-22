import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { GetBooksService } from '@/application/services/books/get-books';
import { GetBooksRepository } from '@/domain/repositories';

export class GetBooksController implements Controller {
  async handle({
    query,
  }: Controller.Request<GetBooksRepository.Query>): Promise<HttpResponse<GetBooksRepository.Result>> {
    const getBooksService = container.resolve(GetBooksService);

    const books = await getBooksService.getBooks(query);

    return new HttpResponse(books);
  }
}
