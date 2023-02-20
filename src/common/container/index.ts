import { container } from 'tsyringe';

import { LoginService } from '@/application/services';
import {
  CreateUserRepository,
  FindUsersRepository,
} from '@/domain/repositories';
import { CreateBookRepository } from '@/domain/repositories/books';
import { Login } from '@/domain/services';
import {
  CreateBookRepositoryImpl,
  CreateUserRepositoryImpl,
  FindUsersRepositoryImpl,
} from '@/infra/mongodb/repositories';

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
