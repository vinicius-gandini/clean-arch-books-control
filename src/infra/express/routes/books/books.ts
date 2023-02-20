import { Router } from 'express';

import {
  CreateBookController,
  DeleteBookController,
  GetBooksController,
  UpdateBookController,
} from '@/application/controllers/books';
import { GetBookInfoController } from '@/application/controllers/books/get-book-info';
import { validateJwt } from '@/infra/jwt';

import { expressRouteAdapter } from '../../route-adapter';

const apiRouter = Router();

const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();
const getBooksController = new GetBooksController();
const getBookInfoController = new GetBookInfoController();

apiRouter.get('/books', validateJwt, expressRouteAdapter(getBooksController));
apiRouter.get(
  '/books/:id',
  validateJwt,
  expressRouteAdapter(getBookInfoController),
);
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
