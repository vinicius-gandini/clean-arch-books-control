import 'reflect-metadata';
import express from 'express';

import { setupMiddlewares } from './middlewares';
import router from './routes';

export const app = express();
setupMiddlewares(app);
app.use(router);
