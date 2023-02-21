import mongoose from 'mongoose';

import { env } from '@/main/config';

export class MongoDbConnection {
  private static instance?: MongoDbConnection;

  static getInstance(): MongoDbConnection {
    if (MongoDbConnection.instance === undefined) {
      MongoDbConnection.instance = new MongoDbConnection();
    }

    return MongoDbConnection.instance;
  }

  async connect() {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(env.mongodb.uri);

      console.log('MongoDB connected');
    } catch (error) {
      console.error(error);
    }
  }
}
