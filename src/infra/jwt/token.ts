import jwt from 'jsonwebtoken';

import { env } from '@/main/config';

export const generateJwt = (id: string) => {
  const { secret } = env.app;
  const token = jwt.sign({ id }, secret, {
    expiresIn: '1h',
  });

  return token;
};
