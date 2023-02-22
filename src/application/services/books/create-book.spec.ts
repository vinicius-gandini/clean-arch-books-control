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
      synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt augue sem, a accumsan velit placerat eget. Nulla tempor rhoncus bibendum. Ut nunc eros, tincidunt et neque vel, consequat vestibulum magna. Nulla sed interdum elit.",
      status: BookStatus.available
    }

    jest.spyOn(createBookRepository, 'create').mockImplementationOnce(async (payload) => payload)
    const createdBook = await createBookService.create(payload);

    expect(createdBook.name).toBe(payload.name);
  })
});
