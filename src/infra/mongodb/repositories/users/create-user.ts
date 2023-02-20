import { injectable } from 'tsyringe';

import { User } from '@/domain/entities';
import { CreateUserRepository } from '@/domain/repositories/users/create-user';
import { UsersModel } from '@/infra/mongodb/schemas';

@injectable()
export class CreateUserRepositoryImpl implements CreateUserRepository {
  async create(params: User) {
    const user = await UsersModel.create(params);
    const parsedUser = user.toJSON();

    return parsedUser;
  }
}
