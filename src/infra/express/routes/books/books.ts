import { Router } from 'express';

import { validateJwt } from '@/application/middlewares/jwt';

// import { expressRouteAdapter } from '../../route-adapter';

const apiRouter = Router();

apiRouter.get('/books', validateJwt);

export { apiRouter };
