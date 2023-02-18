import { app } from '@/infra/express/app';
import { MongoDbConnection } from '@/infra/mongodb/connection';

import { env } from './config';

export class Server {
  static async boot() {
    MongoDbConnection.getInstance().connect();

    app.listen(env.app.port, () =>
      console.log(`Listening on port ${env.app.port}`),
    );
  }
}

Server.boot();
