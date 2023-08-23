import { FieldValidationError } from 'express-validator';
import { BaseError } from './BaseError';
import { ErrorMessage } from '../model/ErrorMessage';
export declare class RequestValidationError extends BaseError {
    errors: FieldValidationError[];
    statusCode: number;
    constructor(message: string, errors: FieldValidationError[]);
    getSerializedErrors(): ErrorMessage[];
}
