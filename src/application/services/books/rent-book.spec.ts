import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { FindUsersRepository, GetBookInfoRepository, RentBookRepository } from "@/domain/repositories";
import { FindUsersRepositoryImpl, GetBookInfoRepositoryImpl } from "@/infra/mongodb/repositories";
import { RentBookService } from './rent-book';
import { RentBookRepositoryImpl } from '@/infra/mongodb/repositories/books/rent-book';

jest.mock('../../../infra/mongodb/repositories/books/get-book-info')
jest.mock('../../../infra/mongodb/repositories/books/rent-book')
jest.mock('../../../infra/mongodb/repositories/users/find-user')
describe('RentBook', () => {
  let getBookInfoRepository: GetBookInfoRepository
  let findUserRepository: FindUsersRepository
  let rentBookRepository: RentBookRepository
  let rentBookService: RentBookService

  beforeEach(() => {
    getBookInfoRepository = new GetBookInfoRepositoryImpl();
    findUserRepository = new FindUsersRepositoryImpl();
    rentBookRepository = new RentBookRepositoryImpl();
    rentBookService = new RentBookService(rentBookRepository, getBookInfoRepository, findUserRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should rent a book', async () => {
    const payload = {
      userId: '1',
      userUsername: 'jacksparrow',
      bookId: '1',
      bookName: 'O Hobbit'
    }

    const book = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    const bookToRent = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.rented
    }

    const user = {
      id: '1',
      name: "Jack Sparrow",
	    username: "jacksparrow",
      password: "jack1234"
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => book)
    jest.spyOn(findUserRepository, 'findById').mockImplementationOnce(async () => user)
    jest.spyOn(rentBookRepository, 'rent').mockImplementationOnce(async () => bookToRent)

    const rentedBook = await rentBookService.rent(payload)
    expect(rentedBook.status).toBe(BookStatus.rented);
  })

  it('Should not be able to rent a book that is not found', async () => {
    const payload = {
      userId: '1',
      userUsername: 'jacksparrow',
      bookId: '1',
      bookName: 'O Hobbit'
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => null)

    expect(rentBookService.rent(payload)).rejects.toThrow(new Error(`Book not found`))
  })

  it('Should not be able to rent a book that is not available', async () => {
    const payload = {
      userId: '1',
      userUsername: 'jacksparrow',
      bookId: '1',
      bookName: 'O Hobbit'
    }

    const notAvailableBook = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.rented
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => notAvailableBook)

    expect(rentBookService.rent(payload)).rejects.toThrow(new Error(`Book not available for rent`))
  })

  it('Should not be able to rent a book if user not founded', async () => {
    const payload = {
      userId: '1',
      userUsername: 'jacksparrow',
      bookId: '1',
      bookName: 'O Hobbit'
    }

    const book = {
      id: '1',
      name: "O Hobbit",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => book)
    jest.spyOn(findUserRepository, 'findById').mockImplementationOnce(async () => null)

    expect(rentBookService.rent(payload)).rejects.toThrow(new Error(`User not found`))
  })
});
