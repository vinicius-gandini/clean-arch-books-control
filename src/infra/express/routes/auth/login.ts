import { Router } from 'express';

import { LoginController } from '@/application/controllers/auth/login';

import { expressRouteAdapter } from '../../route-adapter';

const authRouter = Router();

const loginController = new LoginController();

authRouter.post('/auth', expressRouteAdapter(loginController));

export { authRouter };
