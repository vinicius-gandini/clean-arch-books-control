import { injectable } from 'tsyringe';

import { GetBooksRepository } from '@/domain/repositories/books';
import { BooksModel } from '@/infra/mongodb/schemas';

@injectable()
export class GetBooksRepositoryImpl implements GetBooksRepository {
  async getBooks(query: GetBooksRepository.Query) {
    const projection = {
      _id: false,
      pages: false,
      synopsis: false,
      __v: false
    }

    // RegEx expression to make MongoDB understand a search in a similar way to 'Like' in SQL
    const regex: GetBooksRepository.Query = Object.keys(query).reduce((obj, key) => {
      const parsed = new RegExp(`${query[key as keyof GetBooksRepository.Query]}`, 'i');
      return { ...obj, [key]: parsed };
    }, {} as GetBooksRepository.Query)

    const books = await BooksModel.find(regex, projection);

    return books;
  }
}
