import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { DeleteBookRepository, GetBookInfoRepository, UpdateBookRepository } from "@/domain/repositories";
import { DeleteBookRepositoryImpl, GetBookInfoRepositoryImpl, UpdateBookRepositoryImpl } from "@/infra/mongodb/repositories";
import { DeleteBookService } from './delete-book';
import { ReturnBookService } from './return-book';
import { UpdateBookService } from './update-book';

jest.mock('../../../infra/mongodb/repositories/books/update-book')
jest.mock('../../../infra/mongodb/repositories/books/get-book-info')
describe('UpdateBook', () => {
  let updateBookRepository: UpdateBookRepository
  let getBookInfoRepository: GetBookInfoRepository
  let updateBookService: UpdateBookService

  beforeEach(() => {
    updateBookRepository = new UpdateBookRepositoryImpl();
    getBookInfoRepository = new GetBookInfoRepositoryImpl();
    updateBookService = new UpdateBookService(updateBookRepository, getBookInfoRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should return a book', async () => {
    const payload = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    const newBook = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => payload)
    jest.spyOn(updateBookRepository, 'update').mockImplementationOnce(async () => newBook)

    const updatedBook = await updateBookService.update({id: payload.id}, newBook)
    expect(updatedBook.name).toBe(newBook.name);
  })

  it('Should not be able to update a book', async () => {
    const rentedBook = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.rented
    }

    const newBook = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => rentedBook)
    jest.spyOn(updateBookRepository, 'update').mockImplementationOnce(async () => newBook)


    expect(updateBookService.update({id: newBook.id}, newBook)).rejects.toThrow(new Error(`Book not available for update. Please check the book status`))

  })
});
