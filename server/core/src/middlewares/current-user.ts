import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../model/UserPayload';

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  const payload = jwt.verify(req.session.jwt, 'secret') as UserPayload;
  req.currentUser = payload;
  next();
};
