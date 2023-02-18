import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT ?? 3000,
    secret: process.env.APP_SECRET ?? '',
  },
};
