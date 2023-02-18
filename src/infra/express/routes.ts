import { Router } from 'express';

import { authRouter } from './routes/auth';

const router = Router();

router.use('/api', authRouter);
// router.use('/api');

export default router;
