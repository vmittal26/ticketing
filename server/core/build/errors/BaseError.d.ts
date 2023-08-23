import { ErrorMessage } from '../model/ErrorMessage';
import { IError } from './IError';
export declare abstract class BaseError extends Error implements IError {
    abstract statusCode: number;
    constructor(message: string);
    getSerializedErrors(): ErrorMessage[];
}
