import { container } from 'tsyringe';

import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers/http';
import { GetAllUsersService } from '@/application/services';
import { GetAllUsersRepository } from '@/domain/repositories/users/get-all-users';

export class GetAllUsersController implements Controller {
  async handle(): Promise<HttpResponse<GetAllUsersRepository.Result>> {
    const getAllUsersService = container.resolve(GetAllUsersService);

    const users = await getAllUsersService.getUsers();

    return new HttpResponse(users);
  }
}
