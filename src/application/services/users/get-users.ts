import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { GetBooksRepository } from '@/domain/repositories/books';
import { GetAllUsersRepository } from '@/domain/repositories/users/get-all-users';

@injectable()
export class GetAllUsersService implements GetAllUsersRepository {
  constructor(
    @inject(ServiceKeys.GET_USER)
    private readonly getAllUsersRepository: GetAllUsersRepository,
  ) {}

  async getUsers(): Promise<GetBooksRepository.Result> {
    const users = await this.getAllUsersRepository.getUsers();

    return users;
  }
}
