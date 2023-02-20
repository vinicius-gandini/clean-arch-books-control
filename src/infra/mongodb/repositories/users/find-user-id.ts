import { User } from '@/domain/entities';
import { FindUsersRepository } from '@/domain/repositories/users/find-user-id';

import { UsersModel } from '../../schemas';

export class FindUsersRepositoryImpl implements FindUsersRepository {
  async findByUsername(
    params: FindUsersRepository.Params,
  ): Promise<User | null> {
    const user = await UsersModel.findOne({ username: params.username });

    return user;
  }
}
