import { Router } from 'express';

import { CreateBookController } from '@/application/controllers/books/create-book';
import { validateJwt } from '@/infra/jwt';

import { expressRouteAdapter } from '../../route-adapter';

const apiRouter = Router();

const createBookController = new CreateBookController();

apiRouter.get('/books', validateJwt);
apiRouter.post(
  '/books',
  validateJwt,
  expressRouteAdapter(createBookController),
);

export { apiRouter };
