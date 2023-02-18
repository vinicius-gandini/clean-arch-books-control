import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '@/main/config';

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, env.app.secret, (err) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    return next();
  });
  return next();
};
