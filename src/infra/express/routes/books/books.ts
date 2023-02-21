import { Router } from 'express';

import {
  CreateBookController,
  DeleteBookController,
  GetBooksController,
  RentBookController,
  ReturnBookController,
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
const rentBookController = new RentBookController();
const returnBookController = new ReturnBookController();

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
apiRouter.post(
  '/books/rent',
  validateJwt,
  expressRouteAdapter(rentBookController),
);
apiRouter.put(
  '/books/return/:id',
  validateJwt,
  expressRouteAdapter(returnBookController),
);

export { apiRouter };
