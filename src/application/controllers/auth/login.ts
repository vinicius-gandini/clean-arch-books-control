import { container, inject } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { LoginService } from '@/application/services';
import { Login } from '@/domain/services';

export class LoginController implements Controller {
  async handle({
    body,
  }: Controller.Request<Login.Body>): Promise<HttpResponse<Login.Result>> {
    const loginService = container.resolve(LoginService);

    const pokemon = await loginService.execute(body);

    return new HttpResponse(pokemon);
  }
}
