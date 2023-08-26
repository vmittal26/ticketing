import {Request,Response, NextFunction } from 'express';
import { NotAuthorizedUser } from '../errors/NotAuthorizedUser';
import { UserPayload } from '../model/UserPayload';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
   
    if(req.currentUser == null){
      throw new NotAuthorizedUser('User not authorized to access');
    }

    next();
  };