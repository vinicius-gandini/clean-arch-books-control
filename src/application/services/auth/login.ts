import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ServiceKeys } from '@/common/container/keys';
import { FindUsersRepository } from '@/domain/repositories';
import { Login } from '@/domain/services/';
import { generateJwt } from '@/infra/jwt';

@injectable()
export class LoginService implements Login {
  constructor(
    @inject(ServiceKeys.FIND_USER)
    private readonly findUserRepository: FindUsersRepository,
  ) {}

  async execute(body: Login.Body): Promise<Login.Result> {
    const { username, password } = body;

    const user = await this.findUserRepository.findByUsername({ username });

    if (!user) {
      throw new Error(`username/password provided does not match`);
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error(`username/password provided does not match`);
    }

    const token = generateJwt(username);
    return { token };
  }
}
