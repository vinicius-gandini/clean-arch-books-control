import { Router } from 'express';

import { authRouter } from './routes/auth';
import { apiRouter } from './routes/books/books';

const router = Router();

router.use('/', authRouter);
router.use('/api', apiRouter);

export default router;
