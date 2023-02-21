import 'reflect-metadata';
import { CreateBookRepository } from "@/domain/repositories";
import { CreateBookRepositoryImpl  } from "@/infra/mongodb/repositories";
import { CreateBookService } from "./create-book";
import { BookStatus } from '@/domain/entities';

jest.mock('../../../infra/mongodb/repositories/books/create-book')
describe('CreateBook', () => {
  let createBookRepository: CreateBookRepository
  let createBookService: CreateBookService

  beforeEach(() => {
    createBookRepository = new CreateBookRepositoryImpl();
    createBookService = new CreateBookService(createBookRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should create a book', async () => {
    const payload = {
      name: "O Hobbit 2",
	    author: "J. R. R. Tolkien",
	    publisher: "HarperCollins",
	    pages: 336,
      status: BookStatus.available
    }

    jest.spyOn(createBookRepository, 'create').mockImplementationOnce(async (payload) => payload)
    const createdBook = await createBookService.create(payload);

    expect(createdBook.name).toBe(payload.name);
  })
});
