import { NextFunction, Request, Response } from 'express';
import { IError } from '../errors/IError';
import { BaseError } from '../errors/BaseError';

export const errorHandler = async (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    res.status(error.statusCode).send({ errors: error.getSerializedErrors() });
  } else {
    res
      .status(500)
      .send({ errors: [ { message: `Server error ${(error as unknown as Error)?.message}`}]});
  }

  next();
};
