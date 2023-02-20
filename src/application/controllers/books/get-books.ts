import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { GetBooksService } from '@/application/services/books/get-books';
import { GetBooksRepository } from '@/domain/repositories';

export class GetBooksController implements Controller {
  async handle(): Promise<HttpResponse<GetBooksRepository.Result>> {
    const getBooksService = container.resolve(GetBooksService);

    const books = await getBooksService.getBooks();

    return new HttpResponse(books);
  }
}
