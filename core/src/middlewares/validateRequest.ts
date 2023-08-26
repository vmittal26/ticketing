import { FieldValidationError, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { Response, Request, NextFunction } from 'express';

export const validateRequest = (req:Request, _res:Response,next:NextFunction)=>{
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError( 'signup error', errors.array() as FieldValidationError[] );
  }

  next();
};