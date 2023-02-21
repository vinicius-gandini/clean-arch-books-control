import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { GetBooksRepository } from "@/domain/repositories";
import { GetBooksRepositoryImpl } from "@/infra/mongodb/repositories";
import { GetBooksService } from './get-books';

jest.mock('../../../infra/mongodb/repositories/books/get-books')
describe('GetBookInfo', () => {
  let getBooksRepository: GetBooksRepository
  let getBooksService: GetBooksService

  beforeEach(() => {
    getBooksRepository = new GetBooksRepositoryImpl();
    getBooksService = new GetBooksService(getBooksRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should get a book', async () => {
    const payload = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBooksRepository, 'getBooks').mockImplementationOnce(async () => payload)

    const book = await getBooksService.getBooks()
    expect(book.name).toBe(payload.name);
  })
});
