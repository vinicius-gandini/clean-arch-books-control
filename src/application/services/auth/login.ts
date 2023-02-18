import { injectable } from 'tsyringe';

import { Login } from '@/domain/services/';

@injectable()
export class LoginService implements Login {
  async execute(body: Login.Body): Promise<Login.Result> {
    console.log(body);
    return 's';
  }
}
