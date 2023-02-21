import { injectable } from 'tsyringe';

import { GetAllUsersRepository } from '@/domain/repositories/users/get-all-users';
import { UsersModel } from '@/infra/mongodb/schemas';

@injectable()
export class GetAllUsersRepositoryImpl implements GetAllUsersRepository {
  async getUsers() {
    const users = await UsersModel.find({}, { password: false });

    return users;
  }
}
