import { Router } from 'express';

import { CreateBookController } from '@/application/controllers/books/create-book';
import { DeleteBookController } from '@/application/controllers/books/delete-book';
import { UpdateBookController } from '@/application/controllers/books/update-books';
import { validateJwt } from '@/infra/jwt';

import { expressRouteAdapter } from '../../route-adapter';

const apiRouter = Router();

const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();

apiRouter.get('/books', validateJwt);
apiRouter.post(
  '/books',
  validateJwt,
  expressRouteAdapter(createBookController),
);
apiRouter.put(
  '/books/:id',
  validateJwt,
  expressRouteAdapter(updateBookController),
);
apiRouter.delete(
  '/books/:id',
  validateJwt,
  expressRouteAdapter(deleteBookController),
);

export { apiRouter };
