import { Router } from 'express';

import { authRouter } from './routes/auth';
import { apiRouter } from './routes/books/books';
import { userRouter } from './routes/users/users';

const router = Router();

router.use('/', authRouter);
router.use('/', userRouter);
router.use('/api', apiRouter);

export default router;
