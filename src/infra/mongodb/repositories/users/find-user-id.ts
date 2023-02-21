import { User } from '@/domain/entities';
import {
  FindUsersByIdRepository,
  FindUsersByUsernameRepository,
  FindUsersRepository,
} from '@/domain/repositories/users/find-user-id';

import { UsersModel } from '../../schemas';

export class FindUsersRepositoryImpl implements FindUsersRepository {
  async findByUsername(
    params: FindUsersByUsernameRepository.Params,
  ): Promise<User | null> {
    const user = await UsersModel.findOne({ username: params.username });

    return user;
  }

  async findById(
    params: FindUsersByIdRepository.Params,
  ): Promise<FindUsersByIdRepository.Result> {
    const user = await UsersModel.findOne({ id: params.id });

    return user;
  }
}
