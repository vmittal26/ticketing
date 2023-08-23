import { NextFunction, Request, Response } from 'express';
import { IError } from '../errors/IError';
export declare const errorHandler: (error: IError, req: Request, res: Response, next: NextFunction) => Promise<void>;
