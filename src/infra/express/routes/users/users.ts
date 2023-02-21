import { Router } from 'express';

import { CreateUserController } from '@/application/controllers/users/create-user';
import { GetAllUsersController } from '@/application/controllers/users/get-all-users';
import { validateJwt } from '@/infra/jwt';

import { expressRouteAdapter } from '../../route-adapter';

const userRouter = Router();

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();

userRouter.post('/users', expressRouteAdapter(createUserController));
userRouter.get(
  '/users',
  validateJwt,
  expressRouteAdapter(getAllUsersController),
);

export { userRouter };
