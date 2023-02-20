import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { ServiceKeys } from '@/common/container/keys';
import {
  CreateUserRepository,
  FindUsersRepository,
} from '@/domain/repositories/users';
import { env } from '@/main/config';

@injectable()
export class CreateUserService implements CreateUserRepository {
  constructor(
    @inject(ServiceKeys.CREATE_USER)
    private readonly createUserRepository: CreateUserRepository,
    @inject(ServiceKeys.FIND_USER)
    private readonly findUserRepository: FindUsersRepository,
  ) {}

  async create(
    body: CreateUserRepository.Body,
  ): Promise<CreateUserRepository.Result> {
    const { password, username, ...rest } = body;

    const userExists = await this.findUserRepository.findByUsername({
      username,
    });

    if (userExists) {
      throw new Error(`User with the username: ${username} already exists`);
    }

    const salt = bcrypt.genSaltSync(env.bcrypt.salt);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await this.createUserRepository.create({
      ...rest,
      id: uuidv4(),
      password: hashedPassword,
      username,
    });

    return { user };
  }
}
