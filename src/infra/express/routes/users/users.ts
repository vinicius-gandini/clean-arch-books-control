import { Router } from 'express';

import { CreateUserController } from '@/application/controllers/users/create-user';

import { expressRouteAdapter } from '../../route-adapter';

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post('/users', expressRouteAdapter(createUserController));

export { userRouter };
