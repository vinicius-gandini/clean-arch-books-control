import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { GetBookInfoRepository } from "@/domain/repositories";
import { GetBookInfoRepositoryImpl } from "@/infra/mongodb/repositories";
import { GetBookInfoService } from './get-book-info';

jest.mock('../../../infra/mongodb/repositories/books/get-book-info')
describe('GetBookInfo', () => {
  let getBookInfoRepository: GetBookInfoRepository
  let getBookInfoService: GetBookInfoService

  beforeEach(() => {
    getBookInfoRepository = new GetBookInfoRepositoryImpl();
    getBookInfoService = new GetBookInfoService(getBookInfoRepository)
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

    jest.spyOn(getBookInfoRepository, 'getBookInfo').mockImplementationOnce(async () => payload)

    const book = await getBookInfoService.getBookInfo({id: payload.id})
    expect(book.name).toBe(payload.name);
  })
});
