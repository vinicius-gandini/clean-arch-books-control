import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { DeleteBookRepository, GetBookInfoRepository } from "@/domain/repositories";
import { DeleteBookRepositoryImpl, GetBookInfoRepositoryImpl } from "@/infra/mongodb/repositories";
import { DeleteBookService } from './delete-book';

jest.mock('../../../infra/mongodb/repositories/books/delete-book')
jest.mock('../../../infra/mongodb/repositories/books/get-book-info')
describe('DeleteBook', () => {
  let deleteBookRepository: DeleteBookRepository
  let getBookInfoRepository: GetBookInfoRepository
  let deleteBookService: DeleteBookService

  beforeEach(() => {
    deleteBookRepository = new DeleteBookRepositoryImpl();
    getBookInfoRepository = new GetBookInfoRepositoryImpl();
    deleteBookService = new DeleteBookService(deleteBookRepository, getBookInfoRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should delete a book', async () => {
    const payload = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => payload)
    jest.spyOn(deleteBookRepository, 'delete').mockImplementationOnce(async () => null)

    const deletedBook = await deleteBookService.delete({id: payload.id})
    expect(deletedBook).toBe(null);
  })

  it('Should not delete a book', async () => {
    const payload = {
      id: '1',
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => null)
    jest.spyOn(deleteBookRepository, 'delete').mockImplementationOnce(async () => null)

    expect(deleteBookService.delete({id: payload.id})).rejects.toThrow(new Error(`Book not available to delete. Please verify if the book have the available status`))

  })
});
