import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { DeleteBookRepository, GetBookInfoRepository, UpdateBookRepository } from "@/domain/repositories";
import { DeleteBookRepositoryImpl, GetBookInfoRepositoryImpl, UpdateBookRepositoryImpl } from "@/infra/mongodb/repositories";
import { DeleteBookService } from './delete-book';
import { ReturnBookService } from './return-book';

jest.mock('../../../infra/mongodb/repositories/books/update-book')
jest.mock('../../../infra/mongodb/repositories/books/get-book-info')
describe('ReturnBook', () => {
  let updateBookRepository: UpdateBookRepository
  let getBookInfoRepository: GetBookInfoRepository
  let returnBookService: ReturnBookService

  beforeEach(() => {
    updateBookRepository = new UpdateBookRepositoryImpl();
    getBookInfoRepository = new GetBookInfoRepositoryImpl();
    returnBookService = new ReturnBookService(updateBookRepository, getBookInfoRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should return a book', async () => {
    const rentedBook = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.rented
    }

    const payload = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => rentedBook)
    jest.spyOn(updateBookRepository, 'update').mockImplementationOnce(async () => payload)

    const returnedBook = await returnBookService.update({id: payload.id})
    expect(returnedBook.status).toBe(BookStatus.available);
  })

  it('Should not be able to return a book', async () => {
    const payload = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => payload)
    jest.spyOn(updateBookRepository, 'update').mockImplementationOnce(async () => payload)


    expect(returnBookService.update({id: payload.id})).rejects.toThrow(new Error(`Book has already returned or it's not available. Please check the book status`))

  })
});
