import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { CreateUserService } from '@/application/services';
import { CreateUserRepository } from '@/domain/repositories';

export class CreateUserController implements Controller {
  async handle({
    body,
  }: Controller.Request<CreateUserRepository.Body>): Promise<
    HttpResponse<CreateUserRepository.Result>
  > {
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.create(body);

    return new HttpResponse(user);
  }
}
