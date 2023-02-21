import { container } from 'tsyringe';

import { LoginService } from '@/application/services';
import {
  CreateUserRepository,
  FindUsersRepository,
} from '@/domain/repositories';
import {
  CreateBookRepository,
  DeleteBookRepository,
  GetBookInfoRepository,
  GetBooksRepository,
  RentBookRepository,
  UpdateBookRepository,
} from '@/domain/repositories/books';
import { Login } from '@/domain/services';
import {
  CreateBookRepositoryImpl,
  CreateUserRepositoryImpl,
  DeleteBookRepositoryImpl,
  FindUsersRepositoryImpl,
  GetBookInfoRepositoryImpl,
  GetBooksRepositoryImpl,
  UpdateBookRepositoryImpl,
} from '@/infra/mongodb/repositories';
import { RentBookRepositoryImpl } from '@/infra/mongodb/repositories/books/rent-book';

import { ServiceKeys } from './keys';

container.registerSingleton<Login>(ServiceKeys.LOGIN, LoginService);

container.registerSingleton<CreateUserRepository>(
  ServiceKeys.CREATE_USER,
  CreateUserRepositoryImpl,
);

container.registerSingleton<FindUsersRepository>(
  ServiceKeys.FIND_USER,
  FindUsersRepositoryImpl,
);

container.registerSingleton<CreateBookRepository>(
  ServiceKeys.CREATE_BOOK,
  CreateBookRepositoryImpl,
);

container.registerSingleton<UpdateBookRepository>(
  ServiceKeys.UPDATE_BOOK,
  UpdateBookRepositoryImpl,
);

container.registerSingleton<DeleteBookRepository>(
  ServiceKeys.DELETE_BOOK,
  DeleteBookRepositoryImpl,
);

container.registerSingleton<GetBooksRepository>(
  ServiceKeys.GET_BOOK,
  GetBooksRepositoryImpl,
);

container.registerSingleton<GetBookInfoRepository>(
  ServiceKeys.GET_BOOK_INFO,
  GetBookInfoRepositoryImpl,
);

container.registerSingleton<RentBookRepository>(
  ServiceKeys.RENT_BOOK,
  RentBookRepositoryImpl,
);
