import { app } from '@/infra/express/app';

import { env } from './config';

app.listen(env.app.port, () => console.log('listening'));
