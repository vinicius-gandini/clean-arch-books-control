import { injectable } from 'tsyringe';

import { generateJwt } from '@/application/middlewares/jwt';
import { Login } from '@/domain/services/';

@injectable()
export class LoginService implements Login {
  async execute(body: Login.Body): Promise<Login.Result> {
    const token = generateJwt('jacksparrow');
    return { token };
  }
}
